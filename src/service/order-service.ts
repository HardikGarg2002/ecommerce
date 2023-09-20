import Order from "../model/order";

export const create = async (orderInput: any) => {
  const order = new Order(orderInput);
  return await order.save();
};

export const getById = async (orderId: string) => {
  const result = await Order.findById(orderId);
  return result;
};

export const getOrdersByUserId = async (userId: string) => {
  const results = await Order.find({ user: userId });
  return results;
};

export const get = async () => {
  const results = await Order.find({});
  return results;
};

export const patchStatus = async (orderId: string, status: string) => {
  await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};
