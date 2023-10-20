const winston = require("winston");

module.exports.logger = winston.createLogger({
    format: winston.format.json(),
    level: "http",
    transports: [new winston.transports.Console({})],
});
