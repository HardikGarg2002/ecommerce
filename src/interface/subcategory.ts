import { IPagination } from "./pagination";

export interface ISubcategory {
  _id?: string;
  name: string;
  desc: string;
  code?: string;
  is_active?: boolean;
  category_code: string;
  img_url: string;
  createdBy: string;
  updatedBy: string;
  sort: number;
}

export interface ISubcategoryWithMeta {
  data: ISubcategory[];
  meta: {
    pagination: IPagination;
  };
}
