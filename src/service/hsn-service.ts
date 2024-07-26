import { IHsn } from "../interface/hsn";
import Hsn from "../model/hsn";

export async function create(hsn: any) {
  const newHsn = new Hsn(hsn);
  return await newHsn.save();
}

export async function get() {
  return await Hsn.find();
}

export async function getById(hsnId: string) {
  const hsn = await Hsn.findById(hsnId);
  if (!hsn) {
    throw new Error("Hsn not found");
  }
  return hsn;
}

export async function patch(hsnId: string, hsnInput: Partial<IHsn>) {
  await Hsn.findByIdAndUpdate(hsnId, hsnInput);
}

export async function activate(hsnId: string, hsnInput: Partial<IHsn>) {
  await Hsn.findByIdAndUpdate(hsnId, hsnInput);
}
