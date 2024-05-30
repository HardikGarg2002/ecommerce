import express from "express";
import * as tagHandler from "../handler/tag-handler";
const router = express.Router();

//route to create new tag
router.route("/").post(tagHandler.create);

// route to get all tag
router.route("/").get(tagHandler.get);

//Route to get all tags based on searchText
// router.route("/search").get( tagHandler.search);

//route to get a tag by ID
router.route("/:id").get(tagHandler.getById);

//route to edit text of tag
router.route("/:id/status").patch(tagHandler.activate);

export default router;
