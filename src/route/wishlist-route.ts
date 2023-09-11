import express from "express";
import * as wishlistService from "../service/wishlist-service";

const router = express.Router();

router.get("/user/:id", async (req, res) => {
  try {
    const wishlist = await wishlistService.getByUserId(req.params.id);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const wishlist = await wishlistService.create(req.body);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/:id/product/:productId", async (req, res) => {
  try {
    const wishlist = await wishlistService.addProduct(
      req.params.id,
      req.params.productId
    );
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
