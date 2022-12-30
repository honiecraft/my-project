const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createError } = require("../utils/error");
const User = require("../models/User");

// Post Sign Up
exports.postSignup = async (req, res, next) => {
  const password = req.body.password;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send(JSON.stringify("User successfully created!"));
  } catch (err) {
    next(err);
  }
};

// Post Login
exports.postLogin = async (req, res, next) => {
  const username = req.body.username;
  const pw = req.body.password;

  try {
    const user = await User.findOne({ username: username });
    if (!user) return next(createError(404, "User not Found!"));

    const isPassCorrect = await bcrypt.compare(pw, user.password);
    if (!isPassCorrect)
      return next(createError(400, "Username or Passwords does not match!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherInf } = user._doc;

    return (
      res
        // .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .send(JSON.stringify({ details: { ...otherInf }, token, isAdmin }))
    );
  } catch (err) {
    next(err);
  }
};
