import Alias from '../model/alias';
import { IAlias, IAliasWithMeta } from '../interface/alias';
import { craftPagination, craftQuery, craftSort } from 'filter-library';
import { IUser } from '../interface/user';
import ProductService from './product-service';
import { APIError } from '@hardikgarg2002/node-errorify';

export default class AliasService {
	private _productService = new ProductService();
	allowedQueryFields = ['name', 'is_active', 'created.name', 'updated.name'];
	private async _validateNameUnique(name: string) {
		const matchedAliasCount: number = await Alias.countDocuments({
			$or: [{ name: { $regex: new RegExp(`^${name?.trim()}$`), $options: 'i' } }],
		});
		if (matchedAliasCount > 0) {
			throw APIError.BusinessError(`alias with this name already exists in database`, 'ERR_DUPLICATE');
		}
	}

	public async get(
		filters: any,
		pagination: { page?: number; pageSize?: number },
		sort: string,
	): Promise<IAliasWithMeta> {
		const criteria = craftQuery(filters, this.allowedQueryFields);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);

		const aliasList: IAlias[] = await Alias.find(criteria)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit);
		const totalCount = await Alias.countDocuments(criteria);
		const data: IAliasWithMeta = {
			data: aliasList,
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
	public async getById(id: string, statusError: boolean = false): Promise<IAlias> {
		const alias = await Alias.findById(id).lean();
		if (!alias) {
			throw APIError.BusinessError('alias not found', 'ERR_NOT_FOUND');
		}
		if (statusError === true && alias.is_active === false) {
			throw APIError.BusinessError('alias Inactive', 'ERR_INACTIVE_ALIAS');
		}
		return alias;
	}

	public search = async (filters: any, pagination: any, sort: string, searchText: string): Promise<IAliasWithMeta> => {
		const criteria = craftQuery(filters, this.allowedQueryFields);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);

		const searchCriteria = {
			$or: [
				{ name: { $regex: searchText, $options: 'i' } },
				{ 'created.name': { $regex: searchText, $options: 'i' } },
				{ 'updated.name': { $regex: searchText, $options: 'i' } },
			],
		};

		const filterSearch = { ...criteria, ...searchCriteria };

		const aliasList: IAlias[] = await Alias.find(filterSearch)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit)
			.lean();

		const totalCount = await Alias.countDocuments(filterSearch);

		const data: IAliasWithMeta = {
			data: aliasList,
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

	public async create(aliasInput: IAlias): Promise<string> {
		await this._validateNameUnique(aliasInput.name);
		const newAlias = await this.save(aliasInput, true);
		//AUDIT
		return newAlias._id!;
	}

	public async patch(id: string, reason: string, updated: IUser, nameInput?: string, is_activeInput?: boolean) {
		const existingAlias = await this.getById(id);
		nameInput &&
			existingAlias.name.toLowerCase() != nameInput.toLowerCase() &&
			(await this._validateNameUnique(nameInput));

		if (is_activeInput !== undefined && is_activeInput === false) {
			await this._productService.removeAliasFromProducts(id, updated);
		}

		const updatedAlias: IAlias = {
			...existingAlias,
			name: nameInput ?? existingAlias.name,
			is_active: is_activeInput ?? existingAlias.is_active,
			updated,
		};
		const savedAlias = await this.save(updatedAlias);
		//AUDIT
	}

	public async activate(id: string, reason: string, user: IUser, status: boolean): Promise<void> {
		await this.patch(id, reason, user, undefined, status);
	}

	public async save(aliasInput: IAlias, isNew: boolean = false): Promise<IAlias> {
		const alias = new Alias(aliasInput);
		alias.isNew = isNew;
		return (await alias.save()).toObject();
	}
}
