import Order from "../model/order";

export const create = async (orderInput: any) => {
  try {
    const order = new Order(orderInput);
    return await order.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const result = await Order.findById(orderId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const results = await Order.find({ user: userId });
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAll = async () => {
  try {
    const results = await Order.find({});
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
