const mongoose = require("mongoose");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Transaction = require("../models/Transaction");

// Create New Room
exports.postNewRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).send(JSON.stringify(savedRoom));
  } catch (err) {
    next(err);
  }
};

// Update Room
exports.updateRoom = async (req, res, next) => {
  const roomId = req.params.id;
  const update = req.body;
  
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, update, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(JSON.stringify(updatedRoom));
  } catch (err) {
    next(err);
  }
};

// Update Room Status
exports.updateRoomStatus = async (req, res, next) => {
  const roomId = req.params.id;
  const update = req.body;

  try {
    await Room.updateOne(
      { "roomNumbers._id": roomId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": update,
        },
      }
    );
    return res.status(200).send(JSON.stringify("Updated"));
  } catch (err) {
    next(err);
  }
};

// Delete Room
exports.deleteRoom = async (req, res, next) => {
  const roomId = req.params.id;

  try {
    const roomTypeList = await Room.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(roomId) } },
      {
        $project: {
          roomList: {
            $map: {
              input: "$roomNumbers",
              as: "room",
              in: "$$room._id",
            },
          },
        },
      },
    ]);

    const booked = await Transaction.getFilteredTrans();

    const bookedRoomList = booked
      .map((t) => {
        return t.rooms;
      })
      .flat()
      .map((a) => a.toString());

    const isBooked = roomTypeList[0].roomList.some((room) => {
      return bookedRoomList.indexOf(room.toString()) >= 0;
    });

    if (isBooked) {
      res.status(409).send(JSON.stringify("Can not Delete!"));
    } else {
      await Room.findByIdAndDelete(roomId);
      try {
        await Hotel.updateMany(
          { rooms: { $elemMatch: { $eq: roomId } } },
          {
            $pull: { rooms: roomId },
          }
        );
      } catch (err) {
        next(err);
      }
      res.status(200).send(JSON.stringify("Room deleted!"));
    }
  } catch (err) {
    next(err);
  }
};

// Get Room
exports.getRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findById(roomId);
    res.status(200).send(JSON.stringify(room));
  } catch (err) {
    next(err);
  }
};

// Get All Rooms
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(JSON.stringify(rooms));
  } catch (err) {
    next(err);
  }
};
