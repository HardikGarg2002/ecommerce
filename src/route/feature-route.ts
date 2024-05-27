import express from "express";
import * as featureService from "../service/feature-service";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const feature = await featureService.create(req.body);
    res.json(feature);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", (req, res) => {
  const allDisplayTags = featureService.get();
  res.send(allDisplayTags);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const feature = featureService.getById(id);
  res.status(201).json(feature);
});

export default router;
