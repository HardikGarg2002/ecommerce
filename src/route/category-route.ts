import express from "express";
import * as categoryService from "../service/category-service";

const router = express.Router();

// Route to create a new category
router.route("/").post(async (req, res) => {
  try {
    const category = await categoryService.create(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to get all categories
router.route("/").get(async (req, res) => {
  try {
    const categories = await categoryService.get();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to get category by id
router.route("/:id").get(async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to update category by id
router.route("/:id").put(async (req, res) => {
  try {
    const category = await categoryService.patch(req.params.id, req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to delete category by id
router.route("/:id").delete(async (req, res) => {
  try {
    const is_active = false;
    const category = await categoryService.patchStatus(
      req.params.id,
      is_active
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
