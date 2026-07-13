"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const requestController_1 = require("../controllers/requestController");
const router = express_1.default.Router();
router.post("/adoption-requests", auth_1.verifyToken, requestController_1.createAdoptionRequestHandler);
router.get("/requests", auth_1.verifyToken, requestController_1.getRequestsHandler);
router.patch("/requests/:id", auth_1.verifyToken, requestController_1.updateRequestStatusHandler);
router.delete("/requests/:id", auth_1.verifyToken, requestController_1.deleteRequestHandler);
exports.default = router;
