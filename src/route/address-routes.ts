import express from "express";
import * as addressService from "../service/address-service";

const router = express.Router();

router
  .post("/", addressService.create)
  .get("/user/:id", addressService.getByUserId);

export default router;
