import { IStore } from "../interface/store";
import Store from "../model/store";

export async function create(data: IStore) {
  const store = await Store.create(data);
  return store._id;
}

export async function get(): Promise<IStore[]> {
  return await Store.find();
}

export async function getById(id: string): Promise<IStore> {
  const store = await Store.findById(id);
  if (!store) throw Error("Store not found");
  return store;
}

export async function patch(id: string, data: Partial<IStore>) {
  const store = await Store.findByIdAndUpdate(id, data);
  if (!store) throw Error("Store not found");
  return store;
}

export async function patchStatus(id: string, isActive: boolean) {
  const store = await Store.findByIdAndUpdate(id, { is_active: isActive });
  if (!store) throw Error("Store not found");
  return store;
}
