import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  cost: {
    type: Number,
    required: true,
  },
  shortDesc: {
    type: String,
    maxlength: 400,
  },
  images: {
    primary: {
      type: String,
      trim: true,
    },
    additional: [
      {
        type: String,
        trim: true,
        default: [],
      },
    ],
  },
});

export default mongoose.model("Product", productSchema);
