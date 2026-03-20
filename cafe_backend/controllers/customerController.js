const db = require("../db");

// GET
exports.getCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ADD
exports.addCustomer = (req, res) => {
  const { name, phone } = req.body;

  const sql = "INSERT INTO customers (name, phone) VALUES (?, ?)";

  db.query(sql, [name, phone], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Customer added" });
  });
};

// UPDATE
exports.updateCustomer = (req, res) => {
  const { name, phone } = req.body;

  const sql = "UPDATE customers SET name=?, phone=? WHERE customer_id=?";

  db.query(sql, [name, phone, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
};

// DELETE
exports.deleteCustomer = (req, res) => {
  db.query("DELETE FROM customers WHERE customer_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};