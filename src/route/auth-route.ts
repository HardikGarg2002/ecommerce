import express from "express";
import { login, signup } from "../service/auth-service";
// import { verifyToken } from "../middleware/VerifyToken";

const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);
// router.post('/verify-otp', verifyOtp);
// router.post('/resend-otp', resendOtp);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);
// router.get('/check-auth', verifyToken, checkAuth);
// router.get('/logout', logout);

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

// route to login
router.post("/login", async (req, res) => {
  try {
    const userToken = await login(req.body);
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
