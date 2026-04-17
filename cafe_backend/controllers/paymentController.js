const db = require("../db");

// GET
exports.getPayments = (req, res) => {
  db.query("SELECT * FROM payments", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ADD
exports.addPayment = (req, res) => {
  const { orderId, amount, paymentMethod, paymentDate, paymentStatus } = req.body;

  const sql = `
    INSERT INTO payments (orderId, amount, paymentMethod, paymentDate, paymentStatus)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [orderId, amount, paymentMethod, paymentDate, paymentStatus],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Payment added" });
    }
  );
};

// UPDATE
exports.updatePayment = (req, res) => {
  const { orderId, amount, paymentMethod, paymentDate, paymentStatus } = req.body;

  const sql = `
    UPDATE payments 
    SET orderId=?, amount=?, paymentMethod=?, paymentDate=?, paymentStatus=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [orderId, amount, paymentMethod, paymentDate, paymentStatus, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
};

// DELETE
exports.deletePayment = (req, res) => {
  db.query("DELETE FROM payments WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};