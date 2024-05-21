import { IPagination } from "./pagination";

export interface IStore {
  _id?: string;
  name: string;
  desc: string;
  code: string;
  is_active?: boolean;
  city_key: string;
  createdBy: string;
  updatedBy: string;
  sort: number;
}

export interface IStoreWithMeta {
  data: IStore[];
  meta: {
    pagination: IPagination;
  };
}
