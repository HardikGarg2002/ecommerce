import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interface/category";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      uppercase: true,
      trim: true,
      unique: true,
      index: true,
      immutable: true,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    img_url: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: String,
    updatedBy: String,
    sort: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("categories", categorySchema);

export default Category;
