import express from "express";
import { signup } from "../service/auth-service";
// import { verifyToken } from "../middleware/VerifyToken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const userToken = await signup(req.body);
    res.cookie("token", userToken, {
      sameSite: process.env.PRODUCTION === "true" ? undefined : "lax",
      httpOnly: true,
      secure: process.env.PRODUCTION === "true" ? true : false,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
