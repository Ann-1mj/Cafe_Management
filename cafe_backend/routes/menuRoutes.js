const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// GET all menu items
router.get("/", menuController.getMenu);

// ADD item
router.post("/", menuController.addItem);

// UPDATE item
router.put("/:id", menuController.updateItem);

// DELETE item
router.delete("/:id", menuController.deleteItem);

module.exports = router;