const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo = undefined;

module.exports.dbTest = {
    setUp: async () => {
        mongo = await MongoMemoryServer.create();
        const url = mongo.getUri();

        mongoose.set("strictQuery", true);

        mongoose.connect(url, {
            useNewUrlParser: true,
        });
    },

    dropDatabase: async () => {
        if (mongo) {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await mongo.stop();
        }
    },

    dropCollections: async () => {
        if (mongo) {
            const collections = mongoose.connection.collections;

            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany({});
            }
        }
    },
};
