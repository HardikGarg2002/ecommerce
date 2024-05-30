import mongoose, { Schema } from "mongoose";
import { IFeature } from "../interface/feature";

const featureSchema = new Schema<IFeature>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  desc: {
    type: String,
    required: true,
    trim: true,
  },

  code: {
    type: String,
    index: true,
    uppercase: true,
    immutable: true,
    trim: true,
  },

  type: {
    type: String,
    uppercase: true,
    trim: true,
  },

  createdBy: String,
  updatedBy: String,

  sort: {
    type: Number,
    required: true,
    default: 100,
  },
});

const Feature = mongoose.model<IFeature>("features", featureSchema);

export default Feature;
