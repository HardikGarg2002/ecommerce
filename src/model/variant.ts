import mongoose from "mongoose";
import { IVariant, IVariantType } from "../interface/variant";

const variantSchema = new mongoose.Schema<IVariant>(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    type: {
      type: String,
      enum: Object.values(IVariantType),
      required: true,
      uppercase: true,
    },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          trim: true,
          ref: "products",
        },
        value: { type: String, trim: true },
        quantity: Number,
        measure: { type: String, trim: true },
      },
    ],
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IVariant>("variants", variantSchema);
