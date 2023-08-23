import user from "../model/user";

async function createUser(user: any) {
  try {
    const newUser = new user(user);
    return await newUser.save();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    return await user.find();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getUserById(userId: string) {
  try {
    return await user.findById(userId);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function updateUser(userId: string, user: any) {
  try {
    return await user.findByIdAndUpdate(userId, user, {
      new: true,
    });
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export { createUser, getAllUsers, getUserById, updateUser };
