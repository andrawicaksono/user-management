const express = require("express");
const { checkController } = require("../controllers/check");

const router = express.Router();

router.route("/").get(checkController.check);

module.exports.CheckRoutes = router;
