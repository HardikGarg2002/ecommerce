import Address from "../model/address";

export const create = async (addressInput: any) => {
  if (!addressInput) {
    throw new Error("Address input is required");
  }
  const address = new Address(addressInput);
  return await address.save();
};

export const getByUserId = async (userId: string) => {
  const result = await Address.find({ user: userId });
  return result;
};
