import express from "express";
import * as brandService from "../service/brand-service";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const brand = await brandService.create(req.body);
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const allBrands = await brandService.get();
    res.send(allBrands);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const brand = await brandService.getById(req.params.id);
    res.send(brand);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
