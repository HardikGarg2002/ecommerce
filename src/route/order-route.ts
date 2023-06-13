import express from "express";
import * as orderService from "../service/order-service";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const order = await orderService.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
