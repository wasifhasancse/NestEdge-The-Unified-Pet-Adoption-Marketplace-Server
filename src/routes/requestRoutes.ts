import express from "express";
import { verifyToken } from "../middlewares/auth";
import {
  createAdoptionRequestHandler,
  getRequestsHandler,
  updateRequestStatusHandler,
  deleteRequestHandler,
} from "../controllers/requestController";

const router = express.Router();

router.post("/adoption-requests", verifyToken as any, createAdoptionRequestHandler);
router.get("/requests", verifyToken as any, getRequestsHandler);
router.patch("/requests/:id", verifyToken as any, updateRequestStatusHandler);
router.delete("/requests/:id", verifyToken as any, deleteRequestHandler);

export default router;
