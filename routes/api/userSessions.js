const router = require("express").Router();
const userSessionsController = require("../../controllers/userSessionsController");

// Matches with "/api/users"
router.route("/")
    .post(userSessionsController.create);

router.route("/:id")
    .get(userSessionsController.findById)
    .delete(userSessionsController.remove);

module.exports = router;
