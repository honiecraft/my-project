const mongoose = require("mongoose");
const { Schema } = mongoose;
const Room = require("./Room");

const transactionSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Hotel",
  },
  room: [
    {
      roomId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      no: {
        type: Number,
        required: true,
      },
    },
  ],
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    enum: ["Credit Card", "Cash"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Booked", "Checkin", "Checkout"],
    required: true,
  },
});

// Display Transaction in FrontEnd
transactionSchema.statics.displayTransactions = function (username, limit) {
  const matchCond = username ? { $match: { user: username } } : { $match: {} };
  const limitCond = limit ? { $limit: limit } : { $skip: 0 };

  return this.aggregate([
    matchCond,
    {
      $lookup: {
        from: "hotels",
        localField: "hotel",
        foreignField: "_id",
        as: "hotel",
      },
    },
    {
      $project: {
        _id: 1,
        user: 1,
        hotel: { $first: "$hotel.name" },
        room: {
          $reduce: {
            input: "$room.no",
            initialValue: "",
            in: {
              $concat: [
                { $toString: "$$value" },
                {
                  $cond: {
                    if: { $eq: ["$$value", ""] },
                    then: "",
                    else: ", ",
                  },
                },
                { $toString: "$$this" },
              ],
            },
          },
        },
        date: {
          $concat: [
            {
              $dateToString: {
                format: "%d/%m/%Y",
                date: "$dateStart",
                timezone: "+07:00",
              },
            },
            " - ",
            {
              $dateToString: {
                format: "%d/%m/%Y",
                date: "$dateEnd",
                timezone: "+07:00",
              },
            },
          ],
        },
        price: 1,
        payment: 1,
        status: 1,
      },
    },
    limitCond,
  ]);
};

// Filter Transaction by Date Range
transactionSchema.statics.getFilteredTrans = function (startDate, endDate) {
  const matchCond =
    startDate && endDate
      ? {
          $match: {
            $or: [
              {
                dateStart: { $gte: startDate, $lte: endDate },
              },
              {
                dateEnd: { $gte: startDate, $lte: endDate },
              },
              {
                $and: [
                  { dateStart: { $lte: startDate } },
                  { dateEnd: { $gte: endDate } },
                ],
              },
            ],
          },
        }
      : {
          $match: {
            status: {
              $ne: "Checkout",
            },
          },
        };

  return this.aggregate([
    matchCond,
    {
      $project: {
        _id: 0,
        hotelId: "$hotel",
        rooms: {
          $map: {
            input: "$room",
            as: "rooms",
            in: "$$rooms.roomId",
          },
        },
      },
    },
    {
      $group: {
        _id: "$hotelId",
        rooms: { $push: "$rooms" },
      },
    },
    {
      $addFields: {
        rooms: {
          $reduce: {
            input: "$rooms",
            initialValue: [],
            in: {
              $setUnion: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
    },
  ]);
};

module.exports =
  mongoose.model.Transaction ||
  mongoose.model("Transaction", transactionSchema);
