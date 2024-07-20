import { IAlias, IAliasWithMeta } from "../interface/alias";
import { IUser } from "../interface/user";
import * as _aliasService from "../service/alias-service";

export default class AliasController {
  public create = async (aliasInput: IAlias) => {
    return await _aliasService.create(aliasInput);
  };

  public get = async () => {
    return await _aliasService.get();
  };

  public getById = async (id: string) => {
    return await _aliasService.getById(id.trim());
  };

  public patch = async (
    id: string,
    reason: string,
    user: IUser,
    name: string
  ) => {
    return await _aliasService.patch(id.trim(), {
      user,
      name: name.trim(),
    });
  };

  public activate = async (id: string, active: boolean) => {
    return await _aliasService.patchStatus(id.trim(), active);
  };
}
