const { Logger } = require("../handlers");

module.exports.Error = (err, req, res, next) => {
    let reserror = err.message ? err.message.split(";") : "";
    if (err.message && reserror[0] === "galat") {
        let resPayload = {
            err_code: reserror[2],
            err_message: reserror[3],
            err_message_en: reserror[4],
        };

        return res.status(parseInt(reserror[1])).json(resPayload);
    }

    const printErr = err.stack ? err.stack.split("\n") : err;
    Logger.log("error", "server-err", {
        data: `${printErr[0]}\n${printErr[1]}`,
    });

    return res.status(500).send({
        err_code: "ERRSYS",
        err_message: "kesalahan pada sistem!",
        err_message_en: "internal server error!",
    });
};
