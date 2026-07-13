import { MongoClient, ServerApiVersion, ObjectId, Db, Collection } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.warn("WARNING: MONGODB_URI is not defined in the environment.");
}

export const client = new MongoClient(uri || "mongodb://localhost:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbName = process.env.MONGODB_DATABASE_NAME || "Nest-Edge";
export const db: Db = client.db(dbName);
export const petsCollection: Collection = db.collection("pets");
export const requestsCollection: Collection = db.collection("requests");

export { ObjectId };
