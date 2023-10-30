const winston = require("winston");

module.exports.Logger = winston.createLogger({
    format: winston.format.json(),
    level: "http",
    transports: [new winston.transports.Console({})],
});
