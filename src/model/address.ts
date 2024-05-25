import mongoose from "mongoose";
import { AddressType, IAddress } from "../interface/address";

export const addressSchema = new mongoose.Schema<IAddress>({
  _id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String },
  contact_phone: { type: String },
  address_type: { type: String, enum: AddressType },
  other_address_type: { type: String },
  address: { type: String },
  landmark: { type: String },
  locality: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IAddress>("Address", addressSchema);
