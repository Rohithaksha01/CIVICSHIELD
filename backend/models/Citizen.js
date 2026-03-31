const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    aadhaar: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }

});

module.exports = mongoose.model("Citizen", citizenSchema);