import * as categoryService from "../service/category-service";
import { ICategory, ICategoryWithMeta } from "../interface/category";
import { IUser } from "../interface/user";

export default class CategoryController {
  public create = async (catInput: ICategory) => {
    return await categoryService.create(catInput);
  };

  public get = async () => {
    const categories: ICategory[] = await categoryService.get();
    return categories;
  };

  public getById = async (id: string) => {
    return await categoryService.getById(id.trim());
  };

  public patch = async (
    id: string,
    reason: string,
    user: IUser,
    name?: string,
    desc?: string,
    img?: string,
    sort?: number
  ) => {
    return await categoryService.patch(id.trim(), {
      updated: user,
      name: name?.trim(),
      desc: desc?.trim(),
      img: img?.trim(),
      sort,
    });
  };
  public remove = async (id: string) => {
    return await categoryService.remove(id.trim());
  };

  public patchStatus = async (id: string, active: boolean) => {
    return await categoryService.patchStatus(id.trim(), active);
  };
}
