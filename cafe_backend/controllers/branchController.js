const db = require("../db");

// GET
exports.getBranches = (req, res) => {
  db.query("SELECT * FROM branches", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ADD
exports.addBranch = (req, res) => {
  const { branch_name, location } = req.body;

  const sql = "INSERT INTO branches (branch_name, location) VALUES (?, ?)";

  db.query(sql, [branch_name, location], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Branch added" });
  });
};

// UPDATE
exports.updateBranch = (req, res) => {
  const { branch_name, location } = req.body;

  const sql = "UPDATE branches SET branch_name=?, location=? WHERE branch_id=?";

  db.query(sql, [branch_name, location, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
};

// DELETE
exports.deleteBranch = (req, res) => {
  db.query("DELETE FROM branches WHERE branch_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};