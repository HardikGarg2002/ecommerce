import Brand from "../model/brand";

async function createBrand(brand: any) {
  try {
    const newBrand = new Brand(brand);
    return await newBrand.save();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

async function getAllBrands() {
  try {
    const brands = await Brand.find();
    return brands;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export { createBrand, getAllBrands };
