import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    address: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Dispatched", "Out for delivery", "Cancelled"],
      default: "Pending",
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Order", orderSchema);
