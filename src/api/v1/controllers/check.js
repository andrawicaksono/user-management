module.exports.CheckController = {
    check: (req, res, next) => {
        try {
            return res.status(200).send({
                message: "OK",
            });
        } catch (err) {
            next(err);
        }
    },
};
