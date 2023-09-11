import Wishlist from "../model/wishlist";

export async function create(wishlist: any) {
  if (!wishlist.userId) {
    throw new Error("userId is required");
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
}

export async function get() {
  return await Wishlist.find();
}

export async function getByUserId(userId: string) {
  return await Wishlist.find({ userId });
}

export async function update(wishlistId: string, wishlist: any) {
  return await Wishlist.findByIdAndUpdate(wishlistId, wishlist, {
    new: true,
  });
}

export async function deleteWishlist(wishlistId: string) {
  return await Wishlist.findByIdAndDelete(wishlistId);
}
