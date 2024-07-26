import * as featureService from "../service/feature-service";
import { IFeature } from "../interface/feature";
import { IUser } from "../interface/user";

export default class FeatureController {
  public get = async () => {
    return await featureService.get();
  };

  public getById = async (id: string) => {
    return await featureService.getById(id.trim());
  };

  public create = async (featureInput: IFeature) => {
    return await featureService.create(featureInput);
  };

  public patch = async (
    id: string,
    name?: string,
    desc?: string,
    sort?: number
  ) => {
    return await featureService.patch(id.trim(), { name, desc, sort });
  };

  public remove = async (user: IUser, id: string, reason: string) => {
    return await featureService.remove(id);
  };
}
