const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suggestionSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  username: {
    type: String
  },
  boardID: {
    type: String
  },
  upvotes: {
    type: Array
  },
  downvotes: {
    type: Array
  }
}, { timestamps: true });

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
