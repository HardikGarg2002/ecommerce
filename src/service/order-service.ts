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
