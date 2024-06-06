import express from "express";
import * as variantHandler from "../handler/variant-handler";

const router = express.Router();

//route to create new variant
router.route("/").post(variantHandler.create);

// route to get all variant
router.route("/").get(variantHandler.get);

//Route to edit a particular valid value
router.route("/:id").patch(variantHandler.patch);

// route to add products to variant
router.route("/:id/products").post(variantHandler.addProductsList);

//route to get a variant by ID
router.route("/:id").get(variantHandler.getById);

//route to edit text of variant
// router.route('/:id/status').patch( variantHandler.activate);

//Route to remove a particular product from array of products with help of product_id of a variant
router.route("/:id/products/:product_id").delete(variantHandler.removeProduct);

export default router;
