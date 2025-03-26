import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
// import habitRoutes from "./routes/habitRoutes";


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
connectDB();

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/auth", authRoutes);
// app.use("/api/habits", habitRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
