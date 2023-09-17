import * as productService from "../service/product-service";
import express from "express";

const router = express.Router();

// api to create product
router.post("/", async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", (req, res) => {
  const allProducts = productService.get();
  res.send(allProducts);
});

router.get("/:id", (req, res) => {
  const Products = productService.getById(req.params.id);
  console.log(Products, req.params.id);
  res.send(Products);
});

router.patch("/:id", (req, res) => {
  const product = req.body;
  const id = req.params.id;
  const updatedProduct = productService.update(id, product);
  res.send("Product Updated Successfully");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const deletedProduct = productService.patchStatus(id, false);
  res.send("Product Deleted Successfully");
});

export default router;
