const express = require("express");
const router = express.Router();

const { CheckRoutes } = require("./check");

router.use("/check", CheckRoutes);

module.exports.routes = router;
