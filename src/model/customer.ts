import mongoose from "mongoose";
import ICustomer, { CustomerStatus } from "../interface/customer";
import { addressSchema } from "./address";

const customerSchema = new mongoose.Schema<ICustomer>({
  _id: { type: mongoose.Schema.Types.ObjectId },
  auth_id: { type: String, required: true, unique: true },
  name: { type: String, trim: true },
  mobile: { type: String, unique: true, required: true },
  email: { type: String },
  address: [addressSchema],
  status: {
    type: String,
    enum: CustomerStatus,
    default: CustomerStatus.ACTIVE,
  },
  creation_date: { type: Date, default: Date.now },
});

const Customer = mongoose.model<ICustomer>("Customers", customerSchema);

export default Customer;
