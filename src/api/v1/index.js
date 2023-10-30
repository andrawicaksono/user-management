const { Routes } = require("./routes");
const { Error } = require("./middlewares/error");

module.exports.v1 = (app) => {
    app.use("/api/v1", Routes, Error);
};
