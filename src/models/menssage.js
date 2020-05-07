let mongoose = require("mongoose");

let messages = new mongoose.Schema({
  user: String,
  date: { type: Date, default: Date.now },
  room: Number,
  message: String,
});

module.exports = messages;
