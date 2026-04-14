const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "ann",
  password: "ann123",
  database: "cafe_db",
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;