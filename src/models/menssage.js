let mongoose = require("mongoose");

let messages = new mongoose.Schema({
  user: String,
  date: { type: Date, default: Date.now },
  room: { name: String, id: String },
  audio: Buffer,
  image: String,
  message: String,
});

module.exports = messages;
