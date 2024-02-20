import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema<IOrderModel>(
  {
    profile: { type: Object, required: true },
    organizerId: { type: String, required: true },
    package: { type: Object, required: true },
    time: { type: Date, required: true },
    status: { type: String, required: false },
    totalPrice: { type: String || Number, required: false },
    transaction: { type: [Object], required: true },
    customItem: { type: [Object], default: [], required: true },
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Order || mongoose.model<IOrderModel>("Order", orderSchema);

export default Order;
