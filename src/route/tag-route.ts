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

//Route to edit a tag by id (only active) (also send meta data for the affected fields future prospective)
router.route("/:id").patch((req, res) => {
  try {
    const tag = req.body;
    const id = req.params.id;
    const updatedTag = tagHandler.patch(id, tag);
    res.send("Tag Updated Successfully");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//Route to delete a tag by id (not assigned)    hard delete
router.route("/:id").delete((req, res) => {
  try {
    const id = req.params.id;
    const deletedTag = tagHandler.remove(id);
    res.send("Tag Deleted Successfully");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to edit a status by id (any) (also send meta data for the affected fields)
router.route("/:id/status").patch((req, res) => {
  try {
    const status = req.body.status;
    const tag = tagHandler.patchStatus(req.params.id, status);
    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
