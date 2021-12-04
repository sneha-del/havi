const mongoose = require("mongoose");

require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  phone: { type: String, required: true },
  profession: { type: String, required: true },
  country: { type: String, required: true },
  dob: { type: String, required: true },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
