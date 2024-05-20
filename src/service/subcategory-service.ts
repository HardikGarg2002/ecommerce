import Subcategory from "../model/subcategory";

export async function create(subcategory: any) {
  const newSubcategory = new Subcategory(subcategory);
  return await newSubcategory.save();
}

export async function get() {
  return await Subcategory.find();
}

export async function getById(subcategoryId: string) {
  const subcategory = await Subcategory.findById(subcategoryId);
  if (!subcategory) {
    throw new Error("Subcategory not found");
  }
  return subcategory;
}
