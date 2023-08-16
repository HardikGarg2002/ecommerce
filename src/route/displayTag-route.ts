import express from "express";
import { createDisplayTag } from "../service/displayTag-service";

const router = express.Router();

router.post("/display-tag", async (req, res) => {
  try {
    const displayTag = await createDisplayTag(req.body);
    res.json(displayTag);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
