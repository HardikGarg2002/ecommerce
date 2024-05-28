import Product from "../model/product";

export async function create(product: any) {
  const newProduct = new Product(product);
  return await newProduct.save();
}

export async function get() {
  return await Product.find();
}

export async function getById(productId: string) {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  return product;
}
export async function update(productId: string, product: any): Promise<void> {
  await Product.findByIdAndUpdate(productId, product);
}

export async function patchStatus(
  productId: string,
  status: boolean
): Promise<void> {
  await Product.findByIdAndUpdate(productId, {
    is_active: status,
  });
}
