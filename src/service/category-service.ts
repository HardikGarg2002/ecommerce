import Category from "../model/category";

async function createCategory(category: any) {
  try {
    const newCategory = new Category(category);
    return await newCategory.save();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export { createCategory };
