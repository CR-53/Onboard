const router = require("express").Router();
const boardRoutes = require("./boards");

// Book routes
router.use("/api", boardRoutes);

module.exports = router;
