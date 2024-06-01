import mongoose, { Schema } from "mongoose";
import { IValidvalue } from "../interface/validvalue";

const validvalueSchema = new Schema<IValidvalue>({
  type: {
    type: String,
    required: true,
    immutable: true,
    uppercase: true,
    trim: true,
    index: true,
  },

  label: {
    type: String,
    required: true,
    trim: true,
  },

  values: [
    {
      key: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        index: true,
      },
      label: {
        type: String,
        required: true,
        trim: true,
      },
      sort: {
        type: Number,
        default: 100,
      },
      is_active: {
        type: Boolean,
        default: true,
      },
    },
  ],

  created: {
    _id: {
      type: String,
      immutable: true,
    },
    name: {
      type: String,
      immutable: true,
    },
    date: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },

  updated: {
    _id: {
      type: String,
    },
    name: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
});

const ValidValues = mongoose.model<IValidvalue>(
  "validvalues",
  validvalueSchema
);

export default ValidValues;
