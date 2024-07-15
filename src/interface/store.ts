import { IPagination } from "./pagination";
import { IUser } from "./user";

export interface IStore {
  _id?: string;
  name: string;
  desc: string;
  code: string;
  is_active?: boolean;
  city_key: string;
  sort: number;
  created: IUser;
  updated: IUser;
}

export interface IStoreWithMeta {
  data: IStore[];
  meta: {
    pagination: IPagination;
  };
}
