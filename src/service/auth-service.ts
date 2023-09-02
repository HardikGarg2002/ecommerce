import User from "../model/user";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/GenerateToken";
import { sanitizeUser } from "../utils/sanitizeUser";
import Otp from "../model/otp";
import { generateOTP } from "../utils/GenerateOtp";
import { sendMail } from "../utils/Notification";

async function signup(userInput: any) {
  try {
    const existingUser = await User.findOne({ email: userInput.email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    userInput.password = hashedPassword;

    const createdUser = new User(userInput);
    await createdUser.save();

    const secureInfo = sanitizeUser(createdUser);
    const token = generateToken(secureInfo);

    return token;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Some error occurred while signing up, please try again later"
    );
  }
}

async function login(userInput: any) {
  try {
    const existingUser = await User.findOne({ email: userInput.email });

    if (
      existingUser &&
      (await bcrypt.compare(userInput.password, existingUser.password))
    ) {
      const secureInfo = sanitizeUser(existingUser);
      const token = generateToken(secureInfo);
      return token;
    }
    throw new Error("Invalid Credentials");
  } catch (error) {
    console.log(error);
    throw new Error(
      "Some error occurred while logging in, please try again later"
    );
  }
}

async function verifyOtp(req: any, res: any) {
  try {
    const isValidUserId = await User.findById(req.body.userId);

    if (!isValidUserId) {
      return res.status(404).json({
        message: "User not Found, for which the otp has been generated",
      });
    }

    const isOtpExisting = await Otp.findOne({ user: isValidUserId._id });

    if (!isOtpExisting) {
      return res.status(404).json({ message: "Otp not found" });
    }

    if (isOtpExisting.expiresAt < new Date()) {
      await Otp.findByIdAndDelete(isOtpExisting._id);
      return res.status(400).json({ message: "Otp has been expired" });
    }

    if (
      isOtpExisting &&
      (await bcrypt.compare(req.body.otp, isOtpExisting.otp))
    ) {
      await Otp.findByIdAndDelete(isOtpExisting._id);
      const verifiedUser = await User.findByIdAndUpdate(
        isValidUserId._id,
        { isVerified: true },
        { new: true }
      );
      return res.status(200).json(sanitizeUser(verifiedUser));
    }

    return res.status(400).json({ message: "Otp is invalid or expired" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some Error occurred" });
  }
}

async function resendOtp(userId: string) {
  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      throw new Error("User not found");
    }

    await Otp.deleteMany({ user: existingUser._id });

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const newOtp = new Otp({
      user: userId,
      otp: hashedOtp,
      expiresAt:
        Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME || "600"),
    });
    await newOtp.save();
    await sendMail(
      existingUser.email,
      `OTP Verification for Your Account`,
      `Your One-Time Password (OTP) for account verification is: <b>${otp}</b>.</br>Do not share this OTP with anyone for security reasons`
    );

    return { message: "OTP sent" };
  } catch (error) {
    console.log(error);
    throw new Error(
      "Some error occurred while resending otp, please try again later"
    );
  }
}

export { signup, login, verifyOtp, resendOtp };
