import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// uploads static
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => res.send("Car Rental API OK ✅"));

app.listen(process.env.PORT, () => console.log(`✅ Server running on ${process.env.PORT}`));
