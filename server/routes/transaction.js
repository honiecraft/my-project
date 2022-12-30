const express = require("express");
const router = express.Router();

const { verifyToken, verifyAdmin } = require("../utils/authorization ");
const transController = require("../controllers/transaction");

// Get All Transactions
router.get("/", verifyAdmin, transController.getAllTrans);

// Create Transaction
router.post("/", verifyToken, transController.postTrans);

// Get Transaction By User
router.get("/:userId", verifyToken, transController.getTran);

module.exports = router;
