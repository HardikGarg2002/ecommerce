import Store from '../model/store';
import { craftPagination, craftQuery, craftSort } from 'filter-library';
import { APIError } from '@hardikgarg2002/node-errorify';
import { IStore, IStoreWithMeta } from '../interface/store';
import { IUser } from '../interface/user';

export default class StoreService {
	public async _validateNameAndCodeUnique(name: string, code?: string) {
		const matchedStoreCount = await Store.countDocuments({
			$or: [
				{ name: { $regex: new RegExp(`^${name?.trim()}$`), $options: 'i' } },
				{ code: { $regex: new RegExp(`^${code?.trim()}$`), $options: 'i' } },
			],
		});
		if (matchedStoreCount > 0) {
			throw APIError.BusinessError('store with the same name and code already exists in database', 'ERR_DUPLICATE');
		}
	}
	public async save(storeInput: IStore, isNew: boolean = false): Promise<IStore> {
		const store = new Store(storeInput);
		store.isNew = isNew;
		return (await store.save()).toObject();
	}
	public async get(filters: any, pagination: any, sort: string): Promise<IStoreWithMeta> {
		const criteria = craftQuery(filters);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);

		const storeList: IStore[] = await Store.find(criteria)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit);
		const totalCount = await Store.countDocuments(criteria);
		const data: IStoreWithMeta = {
			data: storeList,
			meta: {
				pagination: {
					page: skip / limit + 1,
					pageSize: limit,
					pageCount: Math.ceil(totalCount / limit),
					total: totalCount,
				},
			},
		};
		return data;
	}
	public async getById(storeId: string): Promise<IStore> {
		const store = await Store.findById(storeId).lean();
		if (!store) {
			throw APIError.BusinessError('store not found', 'ERR_NOT_FOUND');
		}
		return store;
	}

	public search = async (filters: any, pagination: any, sort: string, searchText: string): Promise<IStoreWithMeta> => {
		const criteria = craftQuery(filters);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);
		const searchCriteria = {
			$or: [
				{ name: { $regex: searchText, $options: 'i' } },
				{ desc: { $regex: searchText, $options: 'i' } },
				{ 'updated.name': { $regex: searchText, $options: 'i' } },
			],
		};

		const filterSearch = { ...criteria, ...searchCriteria };

		const storeList: IStore[] = await Store.find(filterSearch)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit)
			.lean();

		const totalCount = await Store.countDocuments(filterSearch);

		const data: IStoreWithMeta = {
			data: storeList,
			meta: {
				pagination: {
					page: skip / limit + 1,
					pageSize: limit,
					pageCount: Math.ceil(totalCount / limit),
					total: totalCount,
				},
			},
		};
		return data;
	};

	public async create(storeInput: IStore): Promise<string> {
		await this._validateNameAndCodeUnique(storeInput.name, storeInput.code);
		const newStore: IStore = await this.save(storeInput, true);
		return newStore._id!;
	}

	public async patch(
		storeId: string,
		user: IUser,
		reason: string,
		name?: string,
		desc?: string,
		city_key?: string,
		sort?: number,
		is_active?: boolean,
	): Promise<void> {
		const existingStore = await this.getById(storeId);
		// if (is_active === undefined && !existingStore.is_active) {
		// 	throw APIError.BusinessError(`Inactive Store can not be modified`, 'ERR_STORE_INACTIVE');
		// }
		name && existingStore.name.toLowerCase() !== name.toLowerCase() && (await this._validateNameAndCodeUnique(name));
		const updatedStore: IStore = {
			...existingStore,
			name: name ?? existingStore.name,
			desc: desc ?? existingStore.desc,
			city_key: city_key ?? existingStore.city_key,
			sort: sort ?? existingStore.sort,
			is_active: is_active ?? existingStore.is_active,
			updated: user,
		};
		await this.save(updatedStore);
	}

	public async activate(storeId: string, user: IUser, reason: string, is_active: boolean) {
		await this.patch(storeId, user, reason, undefined, undefined, undefined, undefined, is_active);
	}
}
