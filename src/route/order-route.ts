import * as orderHandler from "../handler/order-handler";
import express from "express";

const router = express.Router();

//Route to create an order
router.route("/:id/status").patch(orderHandler.patchStatus);

//Route to get all products
router.route("/").get(orderHandler.get);

//Route to get a product by id
router.route("/:id").get(orderHandler.getById);

//Route to refresh payment
router.route("/:id/payment/refresh").get(orderHandler.refreshStatus);

export default router;
