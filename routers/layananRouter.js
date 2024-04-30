const express = require ('express');
const router = express.Router();
const layananRouterService = require ('../service/layananRouterService');

router.get ('/api/layanan', async function (req, res, next){
    try{
        res.json(await layananRouterService.getMultiple(req.query.page));
    } catch (err){
        console.error('Error mengambil data layanan',err.massage);
        next(err)
    }
})

router.post ('/api/tambahlayanan', async function (req, res, next){
    try{
        res.json(await layananRouterService.create(req.body));
    } catch (err){
        console.error('Error membuat data layanan',err.massage);
        next(err)
    }
})

router.put('/api/updatelayanan/:id', async function(req, res, next) {
    try{
        res.json (await layananRouterService.update(req.params.id, req.body)) 
    } catch (err) {
        console.error("Error UPADTE data layanan", err.message)
        next(err)
    }
})

router.delete('/api/deletelayanan/:id', async function(req, res, next) {
    try {
        res.json(await layananRouterService.hapus (req.params.id))
    } catch (err) {
        console.error('Error saat hapus data layanan', err.message)
        next(err)
    }
})
module.exports = router