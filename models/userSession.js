const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const UserSession = mongoose.model("UserSession", userSessionSchema);

module.exports = UserSession;