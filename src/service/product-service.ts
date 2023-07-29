import productSchema from "../model/productSchema";

async function createProduct(product: any) {
  try {
    const newProduct = new productSchema(product);
    return await newProduct.save();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export { createProduct };
