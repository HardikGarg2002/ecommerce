import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../service/product-service";
import express from "express";

const router = express.Router();

// api to create product
router.post("/product", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error });
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

router.patch("/product/:id", (req, res) => {
  const product = req.body;
  const id = req.params.id;
  const updatedProduct = updateProduct(id, product);
  res.send("Product Updated Successfully");
});

router.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  const deletedProduct = deleteProduct(id);
  res.send("Product Deleted Successfully");
});

export default router;
