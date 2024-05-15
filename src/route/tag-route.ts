import express from "express";
import * as tagHandler from "../service/tag-service";

const router = express.Router();

// Route to create a new tag
router.route("/").post((req, res) => {
  try {
    const tag = tagHandler.create(req.body);
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
