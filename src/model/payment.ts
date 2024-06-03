import mongoose from "mongoose";
import { IPayment, PaymentStatus } from "../interface/payment";
import { Currency } from "../interface/order";

const paymentSchema = new mongoose.Schema<IPayment>({
  rzp_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  rzp_payment_id: {
    type: String,
  },
  rzp_signature: {
    type: String,
  },
  entity: {
    type: String,
    default: "order",
  },
  amount: {
    type: Number,
  },
  amount_paid: {
    type: Number,
    default: 0,
  },
  amount_due: {
    type: Number,
    required: true,
  },
  refund_amount: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    enum: Currency,
    default: Currency.INR,
  },
  receipt: {
    type: String,
  },
  offer_id: {
    type: String,
  },
  status: {
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.CREATED,
  },

  rzp_res: {
    type: Object,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IPayment>("payments", paymentSchema);
