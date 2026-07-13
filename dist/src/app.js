"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const petRoutes_1 = __importDefault(require("./routes/petRoutes"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mount modular routes at root level
app.use("/", petRoutes_1.default);
app.use("/", requestRoutes_1.default);
// Base root endpoint
app.get("/", (req, res) => {
    res.send("Hello World! NestEdge Server is running in TypeScript.");
});
exports.default = app;
