import express from "express";
import * as displayTagService from "../service/displayTag-service";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const displayTag = await displayTagService.create(req.body);
    res.json(displayTag);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", (req, res) => {
  const allDisplayTags = displayTagService.get();
  res.send(allDisplayTags);
});

export default router;
