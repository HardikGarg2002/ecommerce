import productSchema from "../model/productSchema";

export async function create(product: any) {
  const newProduct = new productSchema(product);
  return await newProduct.save();
}

export async function get() {
  return await productSchema.find();
}

export async function getById(productId: string) {
  return await productSchema.findById(productId);
}
export async function update(productId: string, product: any): Promise<void> {
  await productSchema.findByIdAndUpdate(productId, product);
}

export async function patchStatus(
  productId: string,
  status: boolean
): Promise<void> {
  await productSchema.findByIdAndUpdate(productId, {
    is_active: status,
  });
}
