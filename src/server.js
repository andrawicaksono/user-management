const { app } = require("./setup/app");
const { db } = require("./setup/db");

try {
    const server = app();
    db();
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
} catch (err) {
    throw new Error(err);
}
