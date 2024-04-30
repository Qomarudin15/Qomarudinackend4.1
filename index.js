const express = require("express"); 
const app = express();
// Middleware untuk mengelola sesi dan cookie 
const session = require("express-session"); 
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
// Mengambil data dari routers
const layananRouter = require("./routers/layananRouter"); 
const loginRouter = require("./routers/loginRouter");
// Middleware untuk mengonversi data form URL-encoded 
app.use(express.urlencoded({ extended: true }));
// Middleware untuk mengonversi data JSON 
app.use(express.json());
// Middleware untuk mengelola cookie
app.use(cookieParser());
// Middleware untuk mengelola sesi
app.use( 
    session({
        secret: "ahterserahajayaaaaaihh", // Kunci rahasia untuk mengamankan sesi 
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Pengaturan cookie (bisa disesuaikan)
    })
);
// Menggunakan Router yang telah dibuat
app.use("/", layananRouter); 
app.use("/api", loginRouter);
// Middleware untuk menangani error 
app.use((err, req, res, next) => {
const statusCode = err.statusCode || 500;
console.error(err.message, err.stack); 
res.status(statusCode).json({ message: err.message });
});
// Endpoint untuk halaman utama
app.get("/", function (req, res) {
res.send("Hello Mahasiswa SM31 Selamat Belajar Express Js");
});
app.listen(5000,function(){
    console.log("Server berjalan dengan lancar")
});