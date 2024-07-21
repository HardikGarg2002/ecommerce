import { IStore, IStoreWithMeta } from "../interface/store";
import * as _storeService from "../service/store-service";
import { IUser } from "../interface/user";

export default class StoreController {
  public get = async (): Promise<IStore[]> => {
    return await _storeService.get();
  };

  public getById = async (storeId: string): Promise<IStore> => {
    return await _storeService.getById(storeId.trim());
  };

  public create = async (storeInput: IStore): Promise<string> => {
    return await _storeService.create(storeInput);
  };

  public patch = async (
    storeId: string,
    user: IUser,
    name?: string,
    desc?: string,
    city_key?: string,
    sort?: number
  ) => {
    // Validate city key if it comes in request

    return await _storeService.patch(storeId.trim(), {
      updated: user,
      name: name?.trim(),
      desc: desc?.trim(),
      city_key: city_key?.trim(),
      sort,
    });
  };

  public patchStatus = async (storeId: string, is_active: boolean) => {
    return await _storeService.patchStatus(storeId.trim(), is_active);
  };
}
