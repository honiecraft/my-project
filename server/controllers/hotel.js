const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Transaction = require("../models/Transaction");

// Create New Hotel
exports.postNewHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).send(JSON.stringify(savedHotel));
  } catch (err) {
    next(err);
  }
};

// Update Hotel
exports.updateHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  const update = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, update, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(JSON.stringify(updatedHotel));
  } catch (err) {
    next(err);
  }
};

// Delete Hotel
exports.deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const transHotel = await Transaction.find({ hotel: hotelId });
    const canDelete = await transHotel.every((h) => {
      return h.status === "Checkout";
    });

    if (transHotel.length === 0 || canDelete) {
      await Hotel.findByIdAndDelete(hotelId);
      res.status(200).send(JSON.stringify("Deleted!"));
    } else res.status(409).send(JSON.stringify("Can not Delete!"));
  } catch (err) {
    next(err);
  }
};

// Get Hotel
exports.getHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    res.status(200).send(JSON.stringify(hotel));
  } catch (err) {
    next(err);
  }
};

// Get All Hotels
exports.getAllHotels = async (req, res, next) => {
  try {
    const hotel = await Hotel.find();
    res.status(200).send(JSON.stringify(hotel));
  } catch (err) {
    next(err);
  }
};

// Get Hotels by Search
exports.hotelsBySearch = async (req, res, next) => {
  const city = req.body.city;
  const startDate = new Date(req.body.dates[0].startDate);
  const endDate = new Date(req.body.dates[0].endDate);
  const minPrice = req.body.options.minPrice || 0;
  const maxPrice = req.body.options.maxPrice || 1000;
  const noOfPeople = req.body.options.adult + req.body.options.child;
  const noOfRoom = req.body.options.room;

  try {
    const booked = await Transaction.getFilteredTrans(startDate, endDate);
    const allHotels = await Hotel.getHotelRooms(city, minPrice, maxPrice);

    let searchResult = [];

    // Exclude occupied rooms in Hotel List
    allHotels.forEach((hotel) => {
      // Get related Transaction
      const hotelTran = booked.filter((t) => {
        return t._id.toString() === hotel._id.toString();
      });

      const roomList = hotelTran[0]?.rooms.map((t) => t.toString());

      //// Condition to get free room on booking date
      // Exclude all booked room from Booked array out of Hotel
      const rList = hotel.rooms.map((roomType) => {
        const rType =
          hotelTran.length > 0
            ? roomType.roomNumbers.filter((room) => {
                return roomList.indexOf(room._id.toString()) === -1;
              })
            : roomType.roomNumbers;

        return {
          ...roomType,
          availableRoomLength: rType.length,
          roomNumbers: rType,
        };
      });

      //// Condition to match noOfRoom and noOfPeople from booking

      // Booking infor:  noOfRoom = 3, noOfPeople = 8;
      // hotel 1
      // roomType1: {maxPeople: 3, availableRoomLength: 1}
      // => {maxAvailable: 1(1<3), remain: 2(3-1)}
      // roomType2: {maxPeople: 2, availableRoomLength: 3}
      // => {maxAvailable: 2(2<3), remain: 0(2-2)}
      // totalPossiblePeople = 1*3 + 2*2 = 7 < 8 => exclude

      let tempArr = [];
      rList.reduce((prev, curr) => {
        const calMaxAvailable = Math.min(prev, curr.availableRoomLength);
        const remain = prev - calMaxAvailable;
        tempArr.push({ maxPeoPle: curr.maxPeople, capable: calMaxAvailable });
        return remain;
      }, noOfRoom);

      const totalPossiblePeople = tempArr.reduce((prev, curr) => {
        return prev + parseInt(curr.maxPeoPle * curr.capable);
      }, 0);

      const totalFreeRoom = rList.reduce((prev, curr) => {
        return prev + parseInt(curr.availableRoomLength);
      }, 0);

      if (totalPossiblePeople >= noOfPeople && totalFreeRoom >= noOfRoom) {
        searchResult.push({
          ...hotel,
          totalFreeRoom,
          totalPossiblePeople,
          rooms: rList,
        });
      }
    });

    res.status(200).send(JSON.stringify(searchResult));
  } catch (err) {
    next(err);
  }
};

// Get Hotels by Fields
exports.hotelsByFields = async (req, res, next) => {
  const query = req.body;
  const hotelByCity = [];
  const hotelByType = [];

  await Promise.all(
    query.cities.map(async (c) => {
      const countResult = await Hotel.countDocuments({ city: c });
      hotelByCity.push({
        city: c,
        count: countResult,
      });
    })
  );
  await Promise.all(
    query.types.map(async (t) => {
      const countResult = await Hotel.countDocuments({ type: t });
      hotelByType.push({
        type: t,
        count: countResult,
      });
    })
  );
  const hotelByRating = await Hotel.find({ featured: true })
    .sort({ rating: -1 })
    .limit(query.limit);

  await res.status(200).send(
    JSON.stringify({
      hotelByCity: hotelByCity,
      hotelByType: hotelByType,
      hotelByRating: hotelByRating,
    })
  );
};

// Get Hotel Rooms
exports.getHotelRooms = async (req, res, next) => {
  const hotelId = req.params.id;
  const startDate = new Date(req.body[0].startDate);
  const endDate = new Date(req.body[0].endDate);

  try {
    const booked = await Transaction.getFilteredTrans(startDate, endDate);

    const bookedTran = booked
      .filter((tran) => {
        return tran._id.toString() === hotelId.toString();
      })[0]
      ?.rooms.map((t) => t.toString());

    const hotel = await Hotel.findById(hotelId);

    const roomList = await Promise.all(
      hotel.rooms.map((roomId) => {
        return Room.findById(roomId);
      })
    );

    let result = [];

    roomList.forEach((rType) => {
      const rooms = bookedTran
        ? rType.roomNumbers.filter((r) => {
            return bookedTran.indexOf(r._id.toString()) === -1;
          })
        : rType.roomNumbers;

      rooms.length > 0 && result.push({ ...rType._doc, roomNumbers: rooms });
    });
    res.status(200).send(JSON.stringify(result));
  } catch (err) {
    next(err);
  }
};
