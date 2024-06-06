import express from "express";
import * as validvalueHandler from "../handler/validvalue-handler";

const router = express.Router();

// Route to create a new valid value
router.route("/").post(validvalueHandler.create);

// Route to get a list of valid values
router.route("/").get(validvalueHandler.get);

// Route to get a particular valid value
router.route("/:type").get(validvalueHandler.getByType);

//Route to edit a particular valid value
router.route("/:type").patch(validvalueHandler.patch);

//Route to add values to a particular valid value
router.route("/:type/values").post(validvalueHandler.addValues);

//Route to view a particular value from array of values with help of key of a validvalue
router.route("/:type/:key").get(validvalueHandler.getValue);

//Route to remove a particular value from array of values with help of key of a validvalue    (soft delete only is_active status changed to false)
router.route("/:type/:key").delete(validvalueHandler.removeValue);

//Route  to edit a particular value from array of values of a validvalue
router.route("/:type/:key").patch(validvalueHandler.patchValue);

//Route  to update status a particular value from array of values of a validvalue
router.route("/:type/:key/status").patch(validvalueHandler.activateValue);

export default router;
