import { IStore, IStoreWithMeta } from '../interface/store';
import StoreService from '../service/store-service';
import { IUser } from '../interface/user';
import ValidvalueService from '../service/validvalue-service';
import { APIError } from '@hardikgarg2002/node-errorify';

export default class StoreController {
	private _storeService = new StoreService();
	private _validvalueService = new ValidvalueService();

	public get = async (filters: any, pagination: any, sort: string): Promise<IStoreWithMeta> => {
		return await this._storeService.get(filters, pagination, sort);
	};

	public getById = async (storeId: string): Promise<IStore> => {
		return await this._storeService.getById(storeId.trim());
	};

	public search = async (filters: any, pagination: any, sort: string, searchText: string): Promise<IStoreWithMeta> => {
		return await this._storeService.search(filters, pagination, sort, searchText.trim());
	};

	public create = async (storeInput: IStore): Promise<string> => {
		const city = await this._validvalueService.getValue('city', storeInput.city_key);
		if (city.is_active === false) {
			throw APIError.BusinessError('City is inactive', 'ERR_INACTIVE');
		}
		return await this._storeService.create(storeInput);
	};

	public patch = async (
		storeId: string,
		user: IUser,
		reason: string,
		name?: string,
		desc?: string,
		city_key?: string,
		sort?: number,
	) => {
		if (city_key) {
			const city = await this._validvalueService.getValue('city', city_key);
			if (city.is_active === false) {
				throw APIError.BusinessError('City is inactive', 'ERR_CITY_INACTIVE');
			}
		}

		return await this._storeService.patch(
			storeId.trim(),
			user,
			reason.trim(),
			name?.trim(),
			desc?.trim(),
			city_key?.trim(),
			sort,
		);
	};

	public activate = async (storeId: string, user: IUser, reason: string, is_active: boolean) => {
		return await this._storeService.activate(storeId.trim(), user, reason.trim(), is_active);
	};
}
