const db = require("../db");

// GET ALL ORDERS
exports.getOrders = (req, res) => {
  const sql = `
    SELECT 
      id,
      customerId,
      branchId,
      totalAmount,
      status,
      created_at AS orderDate
    FROM orders
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(result);
  });
};

// ADD ORDER
exports.addOrder = (req, res) => {
  const { customerId, branchId, totalAmount, status } = req.body;
  const orderStatus = status || "Pending";

  const sql = `
    INSERT INTO orders (customerId, branchId, totalAmount, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [customerId, branchId, totalAmount, orderStatus],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({ message: "Order created" });
    }
  );
};

// UPDATE ORDER
exports.updateOrder = (req, res) => {
  const { customerId, branchId, totalAmount, status } = req.body;

  const sql = `
    UPDATE orders 
    SET customerId=?, branchId=?, totalAmount=?, status=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [customerId, branchId, totalAmount, status, req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({ message: "Updated" });
    }
  );
};

// DELETE ORDER
exports.deleteOrder = (req, res) => {
  const sql = "DELETE FROM orders WHERE id=?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json({ message: "Deleted" });
  });
};