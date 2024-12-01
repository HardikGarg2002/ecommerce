import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 200,
    },
    desc: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    category_code: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    short_desc: {
      type: String,
      maxlength: 400,
    },
    is_active: Boolean,
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
    display_tag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_display_tag",
        trim: true,
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    createdBy: String,
    updatedBy: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
