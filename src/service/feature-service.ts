import { IFeature } from "../interface/feature";
import Feature from "../model/feature";

export async function create(feature: any) {
  const newFeature = new Feature(feature);
  return await newFeature.save();
}

export async function get(): Promise<IFeature[]> {
  const features = await Feature.find();
  return features;
}

export async function getById(id: string): Promise<IFeature> {
  const feature = await Feature.findById(id);
  if (!feature) throw new Error("Feature not found");
  return feature;
}

export async function patch(id: string, featureInput: Partial<IFeature>) {
  await Feature.findByIdAndUpdate(id, featureInput);
}

export async function remove(categoryId: string): Promise<void> {
  await Feature.findByIdAndDelete(categoryId);
}
