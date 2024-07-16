import express from "express";
import * as aliasHandler from "../handler/alias-handler";

const router = express.Router();

// Route to create a new alias
router.route("/").post(aliasHandler.create);

//Route to get all categories
router.route("/").get(aliasHandler.get);

//Route to get all aliases based on searchText
// router.route("/search").get(aliasHandler.search);

//Route to get a alias by id
router.route("/:id").get(aliasHandler.getById);

export default router;
