require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (bisa dibatasi jika mau)
app.use(express.json()); // Untuk parsing JSON request body

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Tes koneksi database
db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Terhubung ke database.");
});

// Routes
app.get("/products", (req, res) => {
  db.query("SELECT name, price, image_url FROM products", (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(result);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend jalan di port ${PORT}`);
});
