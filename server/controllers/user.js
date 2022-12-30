const User = require("../models/User");

// Update User
exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const update = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });
    res.status(200).send(JSON.stringify(updatedUser));
  } catch (err) {
    next(err);
  }
};

// Get User
exports.getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).send(JSON.stringify(user));
  } catch (err) {
    next(err);
  }
};
