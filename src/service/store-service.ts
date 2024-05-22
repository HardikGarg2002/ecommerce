import { IStore } from "../interface/store";
import Store from "../model/store";

export async function create(data: IStore) {
  await Store.create(data);
}

export async function get(): Promise<IStore[]> {
  return await Store.find();
}

export async function getById(id: string): Promise<IStore> {
  const store = await Store.findById(id);
  if (!store) throw Error("Store not found");
  return store;
}
