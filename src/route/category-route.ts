import express from "express";
import * as categoryService from "../service/category-service";

const router = express.Router();

// Route to create a new category
router.route("/").post(async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to get all categories
router.route("/").get(async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to get category by id
router.route("/:id").get(async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to update category by id
router.route("/:id").put(async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to delete category by id
router.route("/:id").delete(async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
