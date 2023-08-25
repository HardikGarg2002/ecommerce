import User from "../model/user";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/GenerateToken";
import { sanitizeUser } from "../utils/sanitizeUser";

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

export { signup };
