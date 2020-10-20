const router = require("express").Router();
const boardRoutes = require("./boards");
const suggestionRoutes = require("./suggestions");

// Suggestion routes /api
router.use("/suggestions", suggestionRoutes);

// Board routes /api
router.use("/boards", boardRoutes);

module.exports = router;
