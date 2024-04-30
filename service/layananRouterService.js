const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const rows = await db.query(
        `SELECT id, nama_layanan, input_foto, deskripsi FROM layanan`
    );
    const data = helper.CekRow(rows);
    return{
        data
    };
}
async function create(datalayanan) {
    try {
      const result = await db.query(
        `INSERT INTO layanan (nama_layanan, input_foto, deskripsi) VALUES
        ('${datalayanan.nama_layanan}', '${datalayanan.input_foto}', '${datalayanan.deskripsi}')`
      );
      if (result.affectedRows) {
        return { message: "Tambah Data layanan Sukses"}
      } else {
        return {message: "Gagal Tambah Data layanan"}
      }
    } catch (error) {
      return {message: "Error Tambah Data layanan"}
    }
  }
  
async function update(id, datalayanan) {
    try {
        const result = await db.query(
            `UPDATE layanan SET nama_layanan="${datalayanan.nama_layanan}", input_foto="${datalayanan.input_foto}",
            deskripsi="${datalayanan.deskripsi}" WHERE id=${id}`
            );
        if (result.affectedRows) {
            return {message: "UPDATE data layanan Berhasil"}
        } else {
            return { message: "Gagal UPDATE data layanan"}
        }
    } catch (error) {
        return {message: "Error UPDATE data layanan"}
    }
}
async function hapus (id) {
    try {
        const result = await db.query(
            `DELETE FROM layanan WHERE id=${id}`
        )
        if (result.affectedRows) {
            return {message: "Hapus data layanan Berhasil"} 
        } else {
            return { message: "Gagal Hapus Data layanan"}
        }
    } catch (error) {
    return {message: "Error saat hapus data layanan"}
    }
}
module.exports = {getMultiple, create, update, hapus};