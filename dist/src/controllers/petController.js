"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePetHandler = exports.updatePetHandler = exports.getListingsHandler = exports.getFeaturedPetsHandler = exports.getPetByIdHandler = exports.getPetsHandler = exports.createPetHandler = void 0;
const petService = __importStar(require("../services/petService"));
const createPetHandler = async (req, res) => {
    try {
        const pet = req.body;
        const result = await petService.createPet(pet);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.createPetHandler = createPetHandler;
const getPetsHandler = async (req, res) => {
    try {
        const result = await petService.getPets(req.query);
        res.json(result);
    }
    catch (error) {
        console.error("Error fetching pets:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getPetsHandler = getPetsHandler;
const getPetByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await petService.getPetById(id);
        if (!pet) {
            return res.status(404).json({ error: "Pet not found" });
        }
        res.json(pet);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPetByIdHandler = getPetByIdHandler;
const getFeaturedPetsHandler = async (req, res) => {
    try {
        const results = await petService.getFeaturedPets();
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getFeaturedPetsHandler = getFeaturedPetsHandler;
const getListingsHandler = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email || typeof email !== "string") {
            return res.status(400).json({ error: "Email is required and must be a string" });
        }
        const result = await petService.getListings(email);
        res.send(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getListingsHandler = getListingsHandler;
const updatePetHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await petService.updatePet(id, updateData);
        res.json({
            success: true,
            result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updatePetHandler = updatePetHandler;
const deletePetHandler = async (req, res) => {
    try {
        const { petId } = req.params;
        const result = await petService.deletePet(petId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deletePetHandler = deletePetHandler;
