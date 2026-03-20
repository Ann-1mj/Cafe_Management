const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "ann",        // change if needed
  password: "ann123",        // your MySQL password
  database: "cafe_db"  // your DB name
});

// Connect
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;