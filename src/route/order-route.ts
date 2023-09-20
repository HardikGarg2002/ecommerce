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

router.get("/", async (req, res) => {
  try {
    const orders = await orderService.get();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await orderService.getById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.params.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const status = req.body.status;
    const order = await orderService.patchStatus(req.params.id, status);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
