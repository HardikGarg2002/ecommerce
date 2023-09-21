import Hsn from "../model/hsn";

export async function create(hsn: any) {
  const newHsn = new Hsn(hsn);
  return await newHsn.save();
}
