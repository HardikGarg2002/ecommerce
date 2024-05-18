import express from "express";
import * as hsnService from "../service/hsn-service";

const router = express.Router();

// api to create hsn
router.post("/", async (req, res) => {
  try {
    const hsn = await hsnService.create(req.body);
    res.json(hsn);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/", (req, res) => {
  const allHsns = hsnService.get();
  res.send(allHsns);
});

router.get("/:id", (req, res) => {
  const hsns = hsnService.getById(req.params.id);
  console.log(hsns, req.params.id);
  res.send(hsns);
});
