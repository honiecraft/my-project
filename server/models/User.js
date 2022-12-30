const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username Exist"],
  },
  password: {
    type: String,
    required: true,
  },
  fullName: String,
  phoneNumber: Number,
  idCard: Number,
  email: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model.User || mongoose.model("User", userSchema);
