const db = require("../db");

// GET
exports.getPayments = (req, res) => {
  db.query("SELECT * FROM payments", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};