import express from "express";
import * as categoryService from "../service/category-service";

const router = express.Router();

// Route to create a new category
router.route("/").post(categoryService.createCategory);

// Route to get all categories
router.route("/").get(categoryService.getAllCategories);

// Route to get category by id
router.route("/:id").get(categoryService.getCategoryById);

// Route to update category by id
router.route("/:id").put(categoryService.updateCategory);

// Route to delete category by id
router.route("/:id").delete(categoryService.deleteCategory);

export default router;
