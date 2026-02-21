import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import authRoute from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);

// CORS
app.use(cors({
    origin: "http://localhost:5173", // Simplified for local dev
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

// ROUTES
app.use("/api/notes", notesRoutes);
app.use("/", authRoute); // This maps POST http://localhost:5002/

// DATABASE & START
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on: http://localhost:${PORT}`);
    });
});