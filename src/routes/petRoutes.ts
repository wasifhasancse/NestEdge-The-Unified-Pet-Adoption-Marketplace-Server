import express from "express";
import { verifyToken } from "../middlewares/auth";
import {
  createPetHandler,
  getPetsHandler,
  getPetByIdHandler,
  getFeaturedPetsHandler,
  getListingsHandler,
  updatePetHandler,
  deletePetHandler,
} from "../controllers/petController";

const router = express.Router();

router.post("/pets", verifyToken as any, createPetHandler);
router.get("/pets", getPetsHandler);
router.get("/pets/:id", verifyToken as any, getPetByIdHandler);
router.get("/featured-pets", getFeaturedPetsHandler);
router.get("/listings", verifyToken as any, getListingsHandler);
router.patch("/pets/:id", verifyToken as any, updatePetHandler);
router.delete("/pets/:petId", verifyToken as any, deletePetHandler);

export default router;
