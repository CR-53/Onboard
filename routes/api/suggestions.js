const router = require("express").Router();
const suggestionsController = require("../../controllers/suggestionsController");

// Matches with "/api"
router.route("/")
  .get(suggestionsController.findAll)
  .post(suggestionsController.create);

// Matches with "/api/suggestions/:id"
router
  .route("/:id")
  .get(suggestionsController.findById);
//   .put(suggestionsController.update)
//   .delete(suggestionsController.remove);

router
  .route("/boardid/:boardid")
  .get(suggestionsController.findSuggestionByBoardId);
  

module.exports = router;
