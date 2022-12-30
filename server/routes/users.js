const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../utils/authorization ");
const usersController = require("../controllers/user");

// Update
router.put("/:id", verifyToken, usersController.updateUser);

// Get User
router.get("/:id", verifyToken, usersController.getUser);

module.exports = router;
