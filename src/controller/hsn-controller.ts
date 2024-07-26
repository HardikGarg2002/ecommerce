import { IHsn } from "../interface/hsn";
import * as hsnService from "../service/hsn-service";

export default class HsnController {
  public get = async (): Promise<IHsn[]> => {
    return await hsnService.get();
  };

  public getById = async (id: string): Promise<IHsn> => {
    return await hsnService.getById(id?.trim());
  };

  public create = async (hsnInput: IHsn): Promise<string> => {
    return (await hsnService.create(hsnInput))._id;
  };

  public patch = async (id: string, hsnInput: Partial<IHsn>) => {
    return await hsnService.patch(id.trim(), hsnInput);
  };

  public activate = async (id: string, hsnInput: Partial<IHsn>) => {
    return await hsnService.activate(id.trim(), hsnInput);
  };
}
