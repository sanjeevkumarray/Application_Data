const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  car: {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
