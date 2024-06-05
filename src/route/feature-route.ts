import express from "express";
import * as featureHandler from "../handler/feature-handler";

const router = express.Router();

// //Route to get all features
router.route("/").get(featureHandler.get);

// // Route to create a new feature
router.route("/").post(featureHandler.create);

//Route to get all subcategories based on searchText
// router.route("/search").get(featureHandler.search);

// //Route to get a feature by id
router.route("/:id").get(featureHandler.getById);

// //Route to edit a feature by id (only active) (also send meta data for the affected fields future prospective)
router.route("/:id").patch(featureHandler.patch);

// //Route to delete a feature by id     hard delete
router.route("/:id").delete(featureHandler.remove);

export default router;
