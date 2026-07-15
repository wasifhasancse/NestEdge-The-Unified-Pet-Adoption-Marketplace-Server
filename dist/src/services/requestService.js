"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequest = exports.updateRequestStatus = exports.getRequestById = exports.getRequests = exports.createAdoptionRequest = void 0;
const db_1 = require("../config/db");
const createAdoptionRequest = async (requestData) => {
    return await db_1.requestsCollection.insertOne(requestData);
};
exports.createAdoptionRequest = createAdoptionRequest;
const getRequests = async ({ userEmail, petId, }) => {
    const query = {};
    if (userEmail)
        query.userEmail = userEmail;
    if (petId)
        query.petId = petId;
    return await db_1.requestsCollection.find(query).toArray();
};
exports.getRequests = getRequests;
const getRequestById = async (id) => {
    return await db_1.requestsCollection.findOne({ _id: new db_1.ObjectId(id) });
};
exports.getRequestById = getRequestById;
const updateRequestStatus = async (id, status) => {
    const request = await (0, exports.getRequestById)(id);
    if (!request)
        return null;
    const result = await db_1.requestsCollection.updateOne({ _id: new db_1.ObjectId(id) }, { $set: { status } });
    if (status === "approved" && request.petId) {
        // Reject other requests for the same pet
        await db_1.requestsCollection.updateMany({
            petId: request.petId,
            _id: { $ne: new db_1.ObjectId(id) },
        }, {
            $set: { status: "rejected" },
        });
    }
    return result;
};
exports.updateRequestStatus = updateRequestStatus;
const deleteRequest = async (id) => {
    return await db_1.requestsCollection.deleteOne({ _id: new db_1.ObjectId(id) });
};
exports.deleteRequest = deleteRequest;
