import mongoose, { Schema } from "mongoose";
import { IAlias } from "../interface/alias";

const aliasSchema = new Schema<IAlias>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
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
  },
  { timestamps: true }
);

const Alias = mongoose.model<IAlias>("aliases", aliasSchema);

export default Alias;
