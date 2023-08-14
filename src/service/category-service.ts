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

async function getAllCategories() {
  try {
    return await Category.find();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getCategoryById(categoryId: string) {
  try {
    return await Category.findById(categoryId);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export { createCategory, getAllCategories, getCategoryById };
