"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.getListings = exports.getFeaturedPets = exports.getPetById = exports.getPets = exports.createPet = void 0;
const db_1 = require("../config/db");
const createPet = async (petData) => {
    return await db_1.petsCollection.insertOne(petData);
};
exports.createPet = createPet;
const getPets = async ({ search, species, age, gender, page, limit }) => {
    const currentPage = Math.max(1, parseInt(page || "1") || 1);
    const itemsPerPage = Math.max(1, parseInt(limit || "9") || 9);
    let query = {};
    // 1. Text search on petName or breed
    if (search) {
        query.$or = [
            { petName: { $regex: search, $options: "i" } },
            { breed: { $regex: search, $options: "i" } },
        ];
    }
    // 2. Species filter
    if (species) {
        query.species = species;
    }
    // 3. Gender filter
    if (gender) {
        query.gender = gender;
    }
    // 4. Age bracket filter
    if (age) {
        if (age === "baby") {
            query.age = { $lte: 1 };
        }
        else if (age === "young") {
            query.age = { $gte: 2, $lte: 5 };
        }
        else if (age === "adult") {
            query.age = { $gte: 6, $lte: 15 };
        }
        else if (age === "senior") {
            query.age = { $gte: 16 };
        }
    }
    const totalItems = await db_1.petsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const results = await db_1.petsCollection
        .find(query)
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .toArray();
    return {
        pets: results,
        totalPages: totalPages || 1,
        currentPage: currentPage,
        totalItems: totalItems,
    };
};
exports.getPets = getPets;
const getPetById = async (id) => {
    return await db_1.petsCollection.findOne({ _id: new db_1.ObjectId(id) });
};
exports.getPetById = getPetById;
const getFeaturedPets = async () => {
    return await db_1.petsCollection.find().limit(6).toArray();
};
exports.getFeaturedPets = getFeaturedPets;
const getListings = async (email) => {
    return await db_1.petsCollection.find({ ownerEmail: email }).toArray();
};
exports.getListings = getListings;
const updatePet = async (id, updateData) => {
    return await db_1.petsCollection.updateOne({ _id: new db_1.ObjectId(id) }, { $set: updateData });
};
exports.updatePet = updatePet;
const deletePet = async (id) => {
    return await db_1.petsCollection.deleteOne({ _id: new db_1.ObjectId(id) });
};
exports.deletePet = deletePet;
