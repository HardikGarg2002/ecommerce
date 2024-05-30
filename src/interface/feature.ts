import { IPagination } from "./pagination";

export interface IFeature {
  _id?: string;
  name: string;
  desc: string;
  code: string;
  type: string;
  sort: number;
  createdBy: string;
  updatedBy: string;
}

export interface IFeatureWithMeta {
  data: IFeature[];
  meta: {
    pagination: IPagination;
  };
}
