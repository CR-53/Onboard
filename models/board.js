const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    validate: [({ length }) => length <= 50, "Project Title can only be a maximum of 50 characters long"]
  },
  description: {
    type: String,
    validate: [({ length }) => length <= 500, "Project Description can only be a maximum of 500 characters long"]
  },
  owner: {
    type: String,
  },
  slug: {
    type: String,
    unique: true
  }
}, {timestamps: true});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
