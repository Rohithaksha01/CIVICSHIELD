const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema({

    officerId: String,
    password: String,
    name: String

});

module.exports = mongoose.model("Officer", officerSchema);