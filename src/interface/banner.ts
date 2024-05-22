import { IPagination } from "./pagination";

export interface IBanner {
  _id?: string;
  name: string;
  desc: string;
  code: string;
  start_date: Date | string;
  end_date: Date | string;
  is_active?: boolean;
  sort: number;
  img_url: string;
  redirect_url: string;
  location: { type: IBannerType; code: string | undefined };
  createdBy: string;
  updatedBy: string;
}

export enum IBannerType {
  Category = "category",
  Subcategory = "subcategory",
  Offer = "offer",
  Home = "home",
}

export interface IBannerWithMeta {
  data: IBanner[];
  meta: {
    pagination: IPagination;
  };
}
