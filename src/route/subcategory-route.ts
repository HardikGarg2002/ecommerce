import * as subcategoryService from "../service/subcategory-service";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const subcategory = await subcategoryService.create(req.body);
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});