import { IStore } from "../interface/store";
import Store from "../model/store";

export async function create(data: IStore) {
  await Store.create(data);
}
