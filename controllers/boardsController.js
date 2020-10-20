const db = require("../models");

// Defining methods for the boardsController
module.exports = {
  // 
  findAll: function(req, res) {
    db.Board
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findBySlug: function(req, res) {
    console.log(req.params)
    db.Board
    .find({slug: req.params.slug})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },
  // find specific board by ID
  findById: function(req, res) {
    db.Board
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // create new board
  create: function(req, res) {
    db.Board
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // update a board
  update: function(req, res) {
    db.Board
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // delete a board
  remove: function(req, res) {
    db.Board
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
