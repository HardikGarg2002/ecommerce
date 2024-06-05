import express from "express";
import * as hsnHandler from "../handler/hsn-handler";

const router = express.Router();

//route to create new hsn
router.route("/").post(hsnHandler.create);

//route to get all hsn
router.route("/").get(hsnHandler.get);

//Route to get all hsn based on searchText
router.route("/search").get(hsnHandler.search);

//route to get hsn by id
router.route("/:id").get(hsnHandler.getById);

//route to edit particular hsn
router.route("/:id").patch(hsnHandler.patch);

//route to change status of hsn
router.route("/:id/status").patch(hsnHandler.activate);

export default router;
