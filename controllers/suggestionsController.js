const db = require("../models");

// Defining methods for the suggestionsController
module.exports = {
  // retrieve most popular suggestions by number of suggestions
  findAll: function(req, res) {
    db.Suggestion
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // find by boardID
  findSuggestionByBoardId: function(req, res) {
    db.Suggestion
    .find({boardID: req.params.boardid})
    .sort({ createdAt: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },
  // find by boardID then sort by votes
  findSuggestionByBoardIdSortByVotes: function(req, res) {
    db.Suggestion
    .find({boardID: req.params.boardid})
    .sort({ difference: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },
  // find specific suggestion by ID
  findById: function(req, res) {
    db.Suggestion
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // create new suggestion
  create: function(req, res) {
    db.Suggestion
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // update a suggestion
  update: function(req, res) {
    db.Suggestion
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // delete a suggestion
  remove: function(req, res) {
    db.Suggestion
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};