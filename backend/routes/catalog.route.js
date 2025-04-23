import express from "express";
import { getCatalog, getCatalogById } from "../controllers/catalog.controller.js";

const router = express.Router();
router.get("/getcatalog", getCatalog);
router.get("/catalog/:id",getCatalogById);
export default router;