import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../service/product-service";
import express from "express";

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

router.get("/product", (req, res) => {
  const allProducts = getAllProducts();
  res.send(allProducts);
});

router.get("/product/:id", (req, res) => {
  const Products = getProductById(req.params.id);
  console.log(Products, req.params.id);
  res.send(Products);
});

export default router;
