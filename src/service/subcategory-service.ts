import Subcategory from "../model/subcategory";

export async function create(subcategory: any) {
  const newSubcategory = new Subcategory(subcategory);
  return await newSubcategory.save();
}
