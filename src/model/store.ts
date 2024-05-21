import mongoose, { Schema } from "mongoose";
import { IStore } from "../interface/store";

const storeSchema = new Schema<IStore>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    city_key: {
      type: String,
      uppercase: true,
    }, // code of the valid values value key //
    code: {
      type: String,
      uppercase: true,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
    sort: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
storeSchema.pre(["save"], function () {
  this.sort = Math.floor(this.sort);
});

const Store = mongoose.model<IStore>("stores", storeSchema);

export default Store;
