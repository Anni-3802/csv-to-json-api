import express from "express";
import { uploadData } from "../controllers/uploadController.js";

const router = express.Router();

router.get("/", uploadData); // GET request to trigger upload

export default router;
