import express from "express";
import dotenv from "dotenv";
import uploadRoute from "./routes/uploadRoute.js";
import { initDB } from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json());

// Initialize database 
initDB();

app.use("/api/upload", uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
