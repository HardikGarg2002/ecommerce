import express from "express";
import {
  createDisplayTag,
  getAllDisplayTags,
} from "../service/displayTag-service";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const displayTag = await createDisplayTag(req.body);
    res.json(displayTag);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", (req, res) => {
  const allDisplayTags = getAllDisplayTags();
  res.send(allDisplayTags);
});

export default router;
