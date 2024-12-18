import express from "express";
import { login, resendOtp, signup, verifyOtp } from "../service/auth-service";
// import { verifyToken } from "../middleware/VerifyToken";

const router = express.Router();

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

// route to logout
router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout Successful" });
});

// Route to verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const isValid = await verifyOtp(req, res);
    res.status(200).json({ message: isValid });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Route to resend OTP
router.post("/resend-otp", async (req, res) => {
  try {
    const isValid = await resendOtp(req.body.userId);
    res.status(200).json({ message: isValid });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
