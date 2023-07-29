import express from "express";
import { createProduct } from "../service/product-service";

const router = express.Router();

// api to create product
router.post("/product", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
