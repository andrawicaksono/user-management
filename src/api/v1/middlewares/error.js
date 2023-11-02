const { Logger } = require("../handlers");

module.exports.Error = (err, req, res, next) => {
    let reserror = err.message ? err.message.split(";") : "";
    if (err.message && reserror[0] === "error") {
        let resPayload = {
            err_code: reserror[2],
            err_message: reserror[3],
        };

        return res.status(parseInt(reserror[1])).json(resPayload);
    }

    const printErr = err.stack ? err.stack.split("\n") : err;
    Logger.log("error", "server-err", {
        data: `${printErr[0]}\n${printErr[1]}`,
    });

    return res.status(500).send({
        err_code: "000",
        err_message: "internal server error!",
    });
};
