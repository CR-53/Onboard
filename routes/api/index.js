const router = require("express").Router();
const boardRoutes = require("./boards");

// Board routes /api/api
router.use("/boards", boardRoutes);

module.exports = router;
