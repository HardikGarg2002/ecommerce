import express from "express";
import * as userService from "../service/user-service";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
