import Category from "../model/category";

export async function create(category: any) {
  const newCategory = new Category(category);
  return await newCategory.save();
}

export async function get() {
  return await Category.find();
}

export async function getById(categoryId: string) {
  return await Category.findById(categoryId);
}

export async function patch(categoryId: string, category: any): Promise<void> {
  await Category.findByIdAndUpdate(categoryId, category);
}

export async function patchStatus(
  categoryId: string,
  is_active: boolean
): Promise<void> {
  await Category.findByIdAndUpdate(categoryId, { is_active });
}
