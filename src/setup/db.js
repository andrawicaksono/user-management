const mongoose = require("mongoose");
const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
} = process.env;

module.exports.db = () => {
    const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

    mongoose
        .connect(url)
        .then(() => console.log(`Connected to DB (${DB_NAME})`));
};
