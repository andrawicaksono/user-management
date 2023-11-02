const express = require("express");
const router = express.Router();

const { CheckRoutes } = require("./check");
const { AdminRoutes } = require("./admin");
const { AuthRoutes } = require("./auth");

router.use("/check", CheckRoutes);
router.use("/admin", AdminRoutes);
router.use("/auth", AuthRoutes);

module.exports.Routes = router;
