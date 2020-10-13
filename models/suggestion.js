const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suggestionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  username: {
    type: String,
  },
  boardID: {
    type: String,
    default: "",
    unique: true
  },
  upvotes: {
    type: Number,
  },
  downvotes: {
    type: Number
  }
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
