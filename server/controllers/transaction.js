const Hotel = require("../models/Hotel");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

// Create new Transaction
exports.postTrans = async (req, res, next) => {
  if (!req.body.room[0]) {
    res.status(404).send(JSON.stringify({ message: "Missing Room Number!" }));
  } else {
    const newTrans = new Transaction(req.body);
    try {
      const savedTrans = await newTrans.save();

      res.status(200).send(JSON.stringify(savedTrans));
    } catch (err) {
      next(err);
    }
  }
};

exports.getTran = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const tran = await Transaction.displayTransactions(user.username, null);
    res.status(200).send(JSON.stringify(tran));
  } catch (err) {
    next(err);
  }
};

exports.getAllTrans = async (req, res, next) => {
  const limitSize = parseInt(req.query.limit) || 0;

  try {
    const data = await Transaction.displayTransactions(null, limitSize);
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
};
