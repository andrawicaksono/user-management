const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { v1 } = require("../api/v1");

module.exports.app = () => {
    const app = express();

    app.use(bodyParser.json({ limit: "200mb" }));
    app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
    app.use(bodyParser.text({ limit: "200mb" }));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());

    v1(app);
    return app;
};
