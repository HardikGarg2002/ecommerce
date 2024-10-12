import AliasService from '../service/alias-service';
import { IAlias, IAliasWithMeta } from '../interface/alias';
import { IUser } from '../interface/user';

export default class AliasController {
	private _aliasService = new AliasService();

	public create = async (aliasInput: IAlias) => {
		return await this._aliasService.create(aliasInput);
	};

	public get = async (filters: any, pagination: any, sort: string) => {
		const aliasesWithMeta: IAliasWithMeta = await this._aliasService.get(filters, pagination, sort);
		return aliasesWithMeta;
	};

	public getById = async (id: string) => {
		return await this._aliasService.getById(id.trim());
	};

	public search = async (filters: any, pagination: any, sort: string, searchText: string): Promise<IAliasWithMeta> => {
		return await this._aliasService.search(filters, pagination, sort, searchText.trim());
	};

	public patch = async (id: string, reason: string, user: IUser, name: string) => {
		return await this._aliasService.patch(id.trim(), reason.trim(), user, name.trim());
	};

	public activate = async (id: string, reason: string, user: IUser, active: boolean) => {
		return await this._aliasService.activate(id.trim(), reason.trim(), user, active);
	};
}
