import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Wishlist", wishlistSchema);
