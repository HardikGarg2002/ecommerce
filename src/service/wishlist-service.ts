import Wishlist from "../model/wishlist";

async function createWishlist(wishlist: any) {
  try {
    const newWishlist = new Wishlist(wishlist);
    return await newWishlist.save();
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

export { createWishlist, getWishlistByUserId };
