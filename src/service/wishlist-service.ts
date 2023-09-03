import Wishlist from "../model/wishlist";

async function createWishlist(wishlist: any) {
  try {
    if (!wishlist.userId) {
      throw { message: "userId is required" };
    }
    const existingWishlist = await Wishlist.findOne({
      userId: wishlist.userId,
    });
    if (existingWishlist) {
      console.log("wishlist already exists for this user");
      existingWishlist.products = wishlist.products;
      return await existingWishlist.save();
    }
    const newWishlist = new Wishlist(wishlist);
    return await newWishlist.save();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getAllWishlists() {
  try {
    return await Wishlist.find();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getWishlistByUserId(userId: string) {
  try {
    return await Wishlist.find({ userId });
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function updateWishlist(wishlistId: string, wishlist: any) {
  try {
    return await Wishlist.findByIdAndUpdate(wishlistId, wishlist, {
      new: true,
    });
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function deleteWishlist(wishlistId: string) {
  try {
    return await Wishlist.findByIdAndDelete(wishlistId);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export {
  createWishlist,
  getAllWishlists,
  getWishlistByUserId,
  updateWishlist,
  deleteWishlist,
};
