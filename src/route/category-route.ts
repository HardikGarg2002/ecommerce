import express from "express";
import * as categoryService from "../service/category-service";

const router = express.Router();

// Route to create a new category
router.route("/").post(categoryService.createCategory);

export default router;
