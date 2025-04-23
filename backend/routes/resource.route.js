import express from "express";
import { getBookById, getBooks} from "../controllers/resource.controller.js";

const router = express.Router();
router.get("/getresources", getBooks);
router.get("/resource/:id",getBookById);
export default router;