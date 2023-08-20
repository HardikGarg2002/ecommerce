import express from "express";
import { createBrand, getAllBrands } from "../service/brand-service";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const brand = await createBrand(req.body);
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", (req, res) => {
  const allBrands = getAllBrands();
  res.send(allBrands);
});

export default router;
