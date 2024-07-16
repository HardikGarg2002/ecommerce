import express from "express";
import * as aliasHandler from "../handler/alias-handler";

const router = express.Router();

// Route to create a new alias
router.route("/").post(aliasHandler.create);

export default router;
