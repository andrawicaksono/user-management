const express = require("express");
const { CheckController } = require("../controllers");

const router = express.Router();

router.route("/").get(CheckController.check);

module.exports.CheckRoutes = router;
