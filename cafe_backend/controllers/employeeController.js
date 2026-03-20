const db = require("../db");

// GET
exports.getEmployees = (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ADD
exports.addEmployee = (req, res) => {
  const { name, role, branch_id } = req.body;

  const sql = "INSERT INTO employees (name, role, branch_id) VALUES (?, ?, ?)";

  db.query(sql, [name, role, branch_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Employee added" });
  });
};

// UPDATE
exports.updateEmployee = (req, res) => {
  const { name, role } = req.body;

  const sql = "UPDATE employees SET name=?, role=? WHERE employee_id=?";

  db.query(sql, [name, role, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
};

// DELETE
exports.deleteEmployee = (req, res) => {
  db.query("DELETE FROM employees WHERE employee_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
};