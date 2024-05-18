import { IPagination } from "./pagination";

export interface ICategory {
  _id?: string;
  name: string;
  desc: string;
  code?: string;
  is_active?: boolean;
  img_url: string;
  createdBy: string;
  updatedBy: string;
  sort: number;
}

export interface ICategoryWithMeta {
  data: ICategory[];
  meta: {
    pagination: IPagination;
  };
}

export interface ICategoryInput {
  _id?: string;
  name: string;
  desc: string;
  code?: string;
  is_active?: boolean;
  img_url: string;
  createdBy: string;
  updatedBy: string;
  sort: number;
}

export interface ICategoryInputWithMeta {
  data: ICategoryInput[];
  meta: {
    pagination: IPagination;
  };
}
