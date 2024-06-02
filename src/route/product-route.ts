import express from "express";
import * as productHandler from "../handler/product-handler";

const router = express.Router();

// Route to get all products with filters and pagination (for active and inactive also)
router.route("/").get(productHandler.get);
//get products for an array of product IDs
router.get("/ids", productHandler.getbyIds);
// Route to create a new product
router.route("/").post(productHandler.create);
// search permission with filter pagination and sort and with searchText applied on name and desc
router.route("/search").get(productHandler.search);

// Route to get a product by id
router.route("/:id").get(productHandler.getById);
// Route to edit a product by id (only active) (also send meta data for the affected fields future prospective)
router.route("/:id").patch(productHandler.patch);
// Route to edit a status by id (any) (also send meta data for the affected fields)
router.route("/:id/status").patch(productHandler.activate);

// Route to edit an offer on product status
router.route("/:id/offer").patch(productHandler.patchOffer);
// Route to edit an offer on product prices
router.route("/:id/price").patch(productHandler.patchPrice);
// Route to edit a stock availability status
router.route("/:id/oos").patch(productHandler.patchOos);

// Route to add a tag with id in the product with a specific product id
router.route("/:id/tags").post(productHandler.addTag);
// Route to remove the tag associated with a specific product id
router.route("/:id/tags").delete(productHandler.removeTag);

// Route to add multiple images inside the product
router.route("/:id/images").post(productHandler.addImages);

// Route to add single or multiple aliases to the product
router.route("/:id/aliases").post(productHandler.addAliases);
//Route to remove alias of a product
router.route("/:id/aliases/:alias_id").delete(productHandler.removeAlias);
// // Route to remove img_url from the product
router.route("/:id/images/:img_url").delete(productHandler.removeImage);
// route for setting any image as primary

// Route to add single or multiple features to the product
router.route("/:id/features").post(productHandler.addFeatures);
//Route to remove a particular feature from array of features
router.route("/:id/features/:code").delete(productHandler.removeFeature);

// Route to add multiple relatedProduct to the product
router.route("/:id/relatedproducts").post(productHandler.addRelatedProduct);
// Route to remove a particular related product from array of related product ids
router
  .route("/:id/relatedproducts/:relatedproduct_id")
  .delete(productHandler.removeRelatedProduct);

export default router;
