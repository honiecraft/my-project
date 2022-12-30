const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["hotel", "apartments", "resorts", "villas", "cabins"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: [String],
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
  ],
  cheapestPrice: Number,
});

// Get Hotel Room by Search query
hotelSchema.statics.getHotelRooms = function (city, minPrice, maxPrice) {
  return this.aggregate([
    {
      $lookup: {
        from: "rooms",
        localField: "rooms",
        foreignField: "_id",
        pipeline: [],
        as: "rooms",
      },
    },
    {
      $match: {
        "rooms._id": { $exists: true },
        city: new RegExp(city, "i"),
        cheapestPrice: { $gte: minPrice, $lte: maxPrice },
      },
    },
    {
      $unwind: "$rooms",
    },
    {
      $sort: { "rooms.maxPeople": -1 },
    },
    {
      $group: {
        _id: "$_id",
        rooms: {
          $push: "$rooms",
        },
        address: { $first: "$address" },
        cheapestPrice: { $first: "$cheapestPrice" },
        city: { $first: "$city" },
        desc: { $first: "$desc" },
        distance: { $first: "$distance" },
        featured: { $first: "$featured" },
        name: { $first: "$name" },
        photos: { $first: "$photos" },
        title: { $first: "$title" },
        type: { $first: "$type" },
      },
    },
  ]);
};

module.exports = mongoose.model.Hotel || mongoose.model("Hotel", hotelSchema);
