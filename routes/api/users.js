const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/usersessions"
router.route("/")
    .post(usersController.create);

router.route("/:user")
    .get(usersController.findByUsername);

router.route("/id/:id")
    .get(usersController.findById);

module.exports = router;
