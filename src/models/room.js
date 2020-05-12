let mongoose = require("mongoose");

let room = new mongoose.Schema({
    name: String,
    id: String
});

module.exports = room;
