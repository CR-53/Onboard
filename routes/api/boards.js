const router = require("express").Router();
const boardsController = require("../../controllers/boardsController");

// Matches with "/api/api"
router.route("/")
  .get(boardsController.findAll)
  .get(boardsController.findBySlug)
  .post(boardsController.create);

// Matches with "/api/boards/:id"
router
  .route("/:id")
  .get(boardsController.findById)
  .put(boardsController.update)
  .delete(boardsController.remove);

module.exports = router;