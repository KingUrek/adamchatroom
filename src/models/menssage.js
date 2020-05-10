let mongoose = require("mongoose");

let messages = new mongoose.Schema({
  user: String,
  date: { type: Date, default: Date.now },
  room: { name: String, id: Number },
  message: String,
});

module.exports = messages;
