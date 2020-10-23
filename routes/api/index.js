const router = require("express").Router();
const boardRoutes = require("./boards");
const suggestionRoutes = require("./suggestions");
const userRoutes = require("./users");
const userSessionRoutes = require("./userSessions");

// UserSession routes /api
router.use("/usersessions", userSessionRoutes);

// User routes /api
router.use("/users", userRoutes);

// Suggestion routes /api
router.use("/suggestions", suggestionRoutes);

// Board routes /api
router.use("/boards", boardRoutes);

module.exports = router;
