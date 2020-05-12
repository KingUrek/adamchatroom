let mongoose = require("mongoose");

let update = new mongoose.Schema({
    lastUpdate: { type: Date, default: Date.now },
});

module.exports = update;
