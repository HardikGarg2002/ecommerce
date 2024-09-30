import Alias from "../model/alias";

export async function create(alias: any) {
  const newAlias = new Alias(alias);
  return await newAlias.save();
}

export async function get() {
  const alias = await Alias.find();
  return alias;
}

export async function getById(id: string) {
  const alias = await Alias.findById(id);
  return alias;
}

export async function patch(id: string, alias: any) {
  const updatedAlias = await Alias.findByIdAndUpdate(id, alias, { new: true });
  return updatedAlias;
}

export async function patchStatus(id: string, isActive: boolean) {
  const updatedAlias = await Alias.findByIdAndUpdate(
    id,
    { is_active: isActive },
    { new: true }
  );
  return updatedAlias;
}

export async function deleteAlias(id: string) {
  await Alias.findByIdAndDelete(id);
  return;
}
