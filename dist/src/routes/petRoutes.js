"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const petController_1 = require("../controllers/petController");
const router = express_1.default.Router();
router.post("/pets", auth_1.verifyToken, petController_1.createPetHandler);
router.get("/pets", petController_1.getPetsHandler);
router.get("/pets/:id", auth_1.verifyToken, petController_1.getPetByIdHandler);
router.get("/featured-pets", petController_1.getFeaturedPetsHandler);
router.get("/listings", auth_1.verifyToken, petController_1.getListingsHandler);
router.patch("/pets/:id", auth_1.verifyToken, petController_1.updatePetHandler);
router.delete("/pets/:petId", auth_1.verifyToken, petController_1.deletePetHandler);
exports.default = router;
