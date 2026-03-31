const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String
});

// 🔥 FORCE collection name = "admin"
module.exports = mongoose.model("Admin", AdminSchema, "admins");