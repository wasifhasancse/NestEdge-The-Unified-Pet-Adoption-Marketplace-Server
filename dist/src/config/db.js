"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = exports.requestsCollection = exports.petsCollection = exports.db = exports.client = void 0;
const mongodb_1 = require("mongodb");
Object.defineProperty(exports, "ObjectId", { enumerable: true, get: function () { return mongodb_1.ObjectId; } });
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.warn("WARNING: MONGODB_URI is not defined in the environment.");
}
exports.client = new mongodb_1.MongoClient(uri || "mongodb://localhost:27017", {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const dbName = process.env.MONGODB_DATABASE_NAME || "Nest-Edge";
exports.db = exports.client.db(dbName);
exports.petsCollection = exports.db.collection("pets");
exports.requestsCollection = exports.db.collection("requests");
