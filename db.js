const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // Ganti dengan localhost
  user: "root", // Pastikan username yang benar
  password: "", // Pastikan password sesuai dengan yang Anda gunakan di MySQL
  database: "db_web", // Pastikan database ini ada
});

connection.connect((err) => {
  if (err) {
    console.error("Koneksi gagal:", err.message);
  } else {
    console.log("Berhasil terhubung ke database!");
  }
});

module.exports = connection;
