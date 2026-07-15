import express from "express";
import {
    createPetHandler,
    deletePetHandler,
    getFeaturedPetsHandler,
    getListingsHandler,
    getPetByIdHandler,
    getPetsHandler,
    updatePetHandler,
} from "../controllers/petController";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/pets", verifyToken as any, createPetHandler);
router.get("/pets", getPetsHandler);
router.get("/pets/:id", getPetByIdHandler);
router.get("/featured-pets", getFeaturedPetsHandler);
router.get("/listings", verifyToken as any, getListingsHandler);
router.patch("/pets/:id", verifyToken as any, updatePetHandler);
router.delete("/pets/:petId", verifyToken as any, deletePetHandler);

export default router;
