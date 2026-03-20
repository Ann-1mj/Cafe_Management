const db = require("../db");

// GET
exports.getOrders = (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ADD
exports.addOrder = (req, res) => {
  const { customerId, branchId, orderDate, totalAmount, status } = req.body;

  const sql = `
    INSERT INTO orders (customerId, branchId, orderDate, totalAmount, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [customerId, branchId, orderDate, totalAmount, status],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Order created" });
    }
  );
};

// UPDATE
exports.updateOrder = (req, res) => {
  const { customerId, branchId, orderDate, totalAmount, status } = req.body;

  const sql = `
    UPDATE orders 
    SET customerId=?, branchId=?, orderDate=?, totalAmount=?, status=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [customerId, branchId, orderDate, totalAmount, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
};

// DELETE
exports.deleteOrder = (req, res) => {
  db.query("DELETE FROM orders WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};