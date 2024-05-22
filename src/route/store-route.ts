import express from "express";
import * as storeService from "../service/store-service";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const store = await storeService.create(req.body);
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  const allStores = await storeService.get();
  res.send(allStores);
});

router.get("/:id", async (req, res) => {
  const store = await storeService.getById(req.params.id);
  res.send(store);
});
