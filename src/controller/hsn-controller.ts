import { IHsn, IHsnWithMeta } from '../interface/hsn';
import HsnService from '../service/hsn-service';
import { IUser } from '../interface/user';

export default class HsnController {
	private _hsnService = new HsnService();

	public get = async (filters: any, pagination: any, sort: string): Promise<IHsnWithMeta> => {
		return await this._hsnService.get(filters, pagination, sort);
	};

	public getById = async (id: string): Promise<IHsn> => {
		return await this._hsnService.getById(id?.trim());
	};

	public search = async (filters: any, pagination: any, sort: string, searchText: string): Promise<IHsnWithMeta> => {
		return await this._hsnService.search(filters, pagination, sort, searchText.trim());
	};

	public create = async (hsnInput: IHsn): Promise<string> => {
		hsnInput.code = hsnInput.code.trim();

		return await this._hsnService.create(hsnInput);
	};
	public patch = async (
		id: string,
		user: IUser,
		reason: string,
		code?: string,
		desc?: string,
		gst?: number,
	): Promise<void> => {
		await this._hsnService.patch(id, user, reason, code?.trim(), desc?.trim(), gst);
	};
	public activate = async (id: string, user: IUser, reason: string, is_active: boolean): Promise<void> => {
		await this._hsnService.activate(id, user, reason, is_active);
	};
}
