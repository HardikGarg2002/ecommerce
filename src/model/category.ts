import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
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
    sort: {
      type: Number,
      required: true,
    },
    createdBy: String,
    updatedBy: String,
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("categories", categorySchema);

export default Category;
