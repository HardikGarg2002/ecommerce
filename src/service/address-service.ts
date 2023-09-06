import Address from "../model/address";

export const create = async (addressInput: any) => {
  try {
    if (!addressInput) {
      throw new Error("Address input is required");
    }
    const address = new Address(addressInput);
    return await address.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getByUserId = async (userId: string) => {
  try {
    const result = await Address.find({ user: userId });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
