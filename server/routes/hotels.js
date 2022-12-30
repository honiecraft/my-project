const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../utils/authorization ");
const hotelsController = require("../controllers/hotel");

// Create New Hotel
router.post("/", verifyAdmin, hotelsController.postNewHotel);

// Update
router.put("/:id", verifyAdmin, hotelsController.updateHotel);

// Delete
router.delete("/:id", verifyAdmin, hotelsController.deleteHotel);

// Get Hotel
router.get("/:id", verifyToken, hotelsController.getHotel);

// Get All Hotels
router.get("/", verifyToken, hotelsController.getAllHotels);

// Hotels by Search
router.post("/search", verifyToken, hotelsController.hotelsBySearch);

// Hotels by Fields
router.post("/hotelsbyfields", verifyToken, hotelsController.hotelsByFields);

// Get Hotel Rooms
router.post("/room/:id", verifyToken, hotelsController.getHotelRooms);

module.exports = router;
