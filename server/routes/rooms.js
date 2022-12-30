const express = require("express");
const router = express.Router();

const { verifyToken, verifyAdmin } = require("../utils/authorization ");
const roomsController = require("../controllers/room");

// Create New Room
router.post("/:hotelId", verifyAdmin, roomsController.postNewRoom);

// Update
router.put("/:id", verifyAdmin, roomsController.updateRoom);
router.put("/status/:id", verifyToken, roomsController.updateRoomStatus);

// Delete
router.delete("/:id", verifyAdmin, roomsController.deleteRoom);

// Get Room
router.get("/:id", verifyToken, roomsController.getRoom);

// Get All Rooms
router.get("/", verifyToken, roomsController.getAllRooms);

module.exports = router;
