const db = require("./db");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email dan password harus diisi" });
    }

    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      const user = rows[0];

      if (!user.password) {
        return res
          .status(500)
          .json({ success: false, message: "Password belum terdaftar" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.user = user;
        res.cookie("user", user.id, { maxAge: 3600000 }); // Set cookie for user ID
        res.json({
          success: true,
          message: "Login Berhasil",
          user: { id: user.id, email: user.email, role: user.role },
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Email atau kata sandi salah" });
      }
    } else {
      res
        .status(401)
        .json({ success: false, message: "Email atau kata sandi salah" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Terjadi Kesalahan Server" });
  }
}

function getUser(req, res) {
  const user = req.session.user;

  if (user) {
    res.json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Tidak ada pengguna yang login" });
  }
}

function logout(req, res) {
  req.session.destroy();
  res.clearCookie("user"); // Clear user ID cookie
  res.json({ success: true, message: "Logout berhasil" });
}

async function registerUser(req, res) {
    const { nama, alamat, no_telp, email, password } = req.body;
  
    try {
      if (!nama || !alamat || !no_telp || !email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Semua field harus diisi" });
      }
  
      const existingUser = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
  
      if (existingUser.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Email sudah terdaftar" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
  
      const result = await db.query(
        "INSERT INTO users (nama, alamat, no_telp, email, password) VALUES (?, ?, ?, ?, ?)",
        [nama, alamat, no_telp, email, hashedPassword]
      );
  
      const newUser = await db.query("SELECT * FROM users WHERE id = ?", [
        result.insertId,
      ]);
  
      if (newUser.length > 0) {
        req.session.user = newUser[0]; // Assign user data to session
        res.json({
          success: true,
          message: "Registrasi Berhasil",
          user: {
            id: newUser[0].id,
            email: newUser[0].email,
            role: newUser[0].role,
          },
        });
      } else {
        console.error("User not found in database");
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Server error" });
    }
  }
  

module.exports = {
  login,
  getUser,
  logout,
  registerUser,
};
