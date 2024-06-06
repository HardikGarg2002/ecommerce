import express from "express";
import * as subcategoryHandler from "../handler/subcategory-handler";

const router = express.Router();

// Route to create a new subcategory
router.route("/").post(subcategoryHandler.create);

//Route to get all subcategories
router.route("/").get(subcategoryHandler.get);

//Route to get all subcategories based on searchText
// router.route("/search").get(subcategoryHandler.search);

//Route to get a subcategory by id
router.route("/:id").get(subcategoryHandler.getById);

//Route to edit a subcategory by id (only active) (also send meta data for the affected fields future prospective)
router.route("/:id").patch(subcategoryHandler.patch);

//Route to delete a subcategory by id (not assigned to any product)    hard delete
router.route("/:id").delete(subcategoryHandler.remove);

// Route to edit a status by id (any) (also send meta data for the affected fields)
router.route("/:id/status").patch(subcategoryHandler.patchStatus);

export default router;
