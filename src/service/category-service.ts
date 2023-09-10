import Category from "../model/category";

export async function create(category: any) {
  try {
    const newCategory = new Category(category);
    return await newCategory.save();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function get() {
  try {
    return await Category.find();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function getById(categoryId: string) {
  try {
    return await Category.findById(categoryId);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function patch(categoryId: string, category: any): Promise<void> {
  try {
    await Category.findByIdAndUpdate(categoryId, category);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function patchStatus(
  categoryId: string,
  is_active: boolean
): Promise<void> {
  try {
    await Category.findByIdAndUpdate(categoryId, { is_active });
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
