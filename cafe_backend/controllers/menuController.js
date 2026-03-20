const db = require("../db");

// GET MENU
exports.getMenu = (req, res) => {
  db.query("SELECT * FROM menu", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ADD ITEM
exports.addItem = (req, res) => {
  const { item_name, price, category_id, stock } = req.body;

  const sql = `
    INSERT INTO menu (item_name, price, category_id, stock)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [item_name, price, category_id, stock], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item added" });
  });
};

// UPDATE ITEM
exports.updateItem = (req, res) => {
  const { price, stock } = req.body;

  const sql = "UPDATE menu SET price=?, stock=? WHERE menu_id=?";

  db.query(sql, [price, stock, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
};

// DELETE ITEM
exports.deleteItem = (req, res) => {
  const sql = "DELETE FROM menu WHERE menu_id=?";

  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};