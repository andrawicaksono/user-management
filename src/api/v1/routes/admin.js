const express = require("express");
const { AdminController } = require("../controllers");

const router = express.Router();

router.route("/create").post(AdminController.createAdmin);

module.exports.AdminRoutes = router;
