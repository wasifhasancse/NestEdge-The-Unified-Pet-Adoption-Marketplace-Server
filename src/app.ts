import express, { Request, Response } from "express";
import cors from "cors";
import petRoutes from "./routes/petRoutes";
import requestRoutes from "./routes/requestRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Mount modular routes at root level
app.use("/", petRoutes);
app.use("/", requestRoutes);

// Base root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! NestEdge Server is running in TypeScript.");
});

export default app;
