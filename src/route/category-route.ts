import express from "express";
import * as categoryHandler from "../handler/category-handler";

const router = express.Router();

// Route to create a new category
router.route("/").post(categoryHandler.create);

//Route to get all categories
router.route("/").get(categoryHandler.get);

//Route to get all categories based on searchText
// router.route("/search").get(categoryHandler.search);

//Route to get a category by id
router.route("/:id").get(categoryHandler.getById);

//Route to edit a category by id (only active) (also send meta data for the affected fields future prospective)
router.route("/:id").patch(categoryHandler.patch);

//Route to delete a category by id (not assigned)    hard delete
// router.route("/:id").delete(categoryHandler.remove);

// Route to edit a status by id (any) (also send meta data for the affected fields)
router.route("/:id/status").patch(categoryHandler.patchStatus);

export default router;
