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

//Route to get all tags
router.route("/").get((req, res) => {
  try {
    const allTags = tagHandler.get();
    res.send(allTags);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//Route to get a tag by id
router.route("/:id").get((req, res) => {
  try {
    const tag = tagHandler.getById(req.params.id);
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
