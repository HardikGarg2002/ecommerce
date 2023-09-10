import Brand from "../model/brand";

export async function create(brand: any) {
  const newBrand = new Brand(brand);
  return await newBrand.save();
}

export async function get() {
  const brands = await Brand.find();
  return brands;
}

export async function getById(id: string) {
  const brand = await Brand.findById(id);
  return brand;
}
