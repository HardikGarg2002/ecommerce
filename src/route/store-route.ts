import express from "express";
import * as storeHandler from "../handler/store-handler";

const router = express.Router();

// Route to create a new store
router.route("/").post(storeHandler.create);

//Route to get all store
router.route("/").get(storeHandler.get);

//Route to get all stores based on searchText
router.route("/search").get(storeHandler.search);

//Route to get a store by id
router.route("/:id").get(storeHandler.getById);

//Route to edit a store by id (only active) (also send meta data for the affected fields future prospective)
router.route("/:id").patch(storeHandler.patch);

// Route to edit a status by id (any) (also send meta data for the affected fields)
router.route("/:id/status").patch(storeHandler.activate);

export default router;
