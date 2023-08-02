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

async function getAllProducts() {
  try {
    return await productSchema.find();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getProductById(productId: string) {
  try {
    return await productSchema.findById(productId);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
async function updateProduct(productId: string, product: any) {
  try {
    return await productSchema.findByIdAndUpdate(productId, product, {
      new: true,
    });
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function deleteProduct(productId: string) {
  try {
    return await productSchema.findByIdAndDelete(productId);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
