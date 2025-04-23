import express from "express";
import { geminiResponse } from "../controllers/geminiController.js";

const router = express.Router();

// Use the correct controller function
router.post("/gemini", geminiResponse);

export default router;