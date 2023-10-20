const { routes } = require("./routes");
const { error } = require("./middlewares/error");

module.exports.v1 = (app) => {
    app.use("/api/v1", routes, error);
};
