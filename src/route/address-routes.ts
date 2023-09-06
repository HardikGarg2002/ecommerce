import express from "express";
import * as addressService from "../service/address-service";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const created = await addressService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating an address, please try again later" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const results = await addressService.getByUserId(req.params.id);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching address, please try again later" });
  }
});

export default router;
