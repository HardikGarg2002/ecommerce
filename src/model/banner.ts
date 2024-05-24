import mongoose, { Schema } from "mongoose";
import { IBanner, IBannerType } from "../interface/banner";

const bannerSchema = new Schema<IBanner>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
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

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
      required: true,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    sort: {
      type: Number,
      required: true,
    },

    img_url: {
      type: String,
      required: true,
      trim: true,
    },

    redirect_url: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: {
        type: String,
        enum: Object.values(IBannerType),
        required: true,
      },

      code: {
        type: String,
        uppercase: true,
      },
    },

    createdBy: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
bannerSchema.pre(["save"], function () {
  this.sort = Math.floor(this.sort);
});

const Banner = mongoose.model<IBanner>("banners", bannerSchema);

export default Banner;
