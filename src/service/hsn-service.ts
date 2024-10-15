import { craftPagination, craftQuery, craftSort } from 'filter-library';

import { IHsn, IHsnWithMeta } from '../interface/hsn';
import Hsn from '../model/hsn';
import { IUser } from '../interface/user';

import { APIError } from '@hardikgarg2002/node-errorify';

export default class HsnService {
	private allowedQueryFields = ['desc', 'code', 'is_active', 'gst', 'created.name', 'updated.name'];
	private async save(hsnInput: IHsn, isNew: boolean = false): Promise<IHsn> {
		const hsn = new Hsn(hsnInput);
		hsn.isNew = isNew;
		return (await hsn.save()).toObject();
	}

	public async get(filters: any, pagination: any, sort: string): Promise<IHsnWithMeta> {
		const criteria = craftQuery(filters, this.allowedQueryFields);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);

		const hsnList: IHsn[] = await Hsn.find(criteria)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit);
		const totalCount = await Hsn.countDocuments(criteria);

		const data: IHsnWithMeta = {
			data: hsnList,
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

	public async getById(id: string): Promise<IHsn> {
		const hsn: IHsn | null = await Hsn.findById(id).lean();
		if (!hsn) throw APIError.BusinessError(`Hsn does not exist by this id ${id}`, `ERR_NOT_FOUND`);
		return hsn;
	}
	public async getByCode(code: string, statusError: boolean = false): Promise<IHsn> {
		const hsn: IHsn | null = await Hsn.findOne({ code }).lean();
		if (!hsn) throw APIError.BusinessError(`Hsn does not exist by code ${code}`, `ERR_NOT_FOUND`);
		if (statusError === true && hsn.is_active === false) {
			throw APIError.BusinessError('Hsn Inactive', 'ERR_INACTIVE_HSN');
		}
		return hsn;
	}
	public search = async (filters: any, pagination: any, sort: string, searchText: string): Promise<IHsnWithMeta> => {
		const criteria = craftQuery(filters, this.allowedQueryFields);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);
		const searchCriteria = {
			$or: [
				{ code: { $regex: searchText, $options: 'i' } },
				{ desc: { $regex: searchText, $options: 'i' } },
				{ 'updated.name': { $regex: searchText, $options: 'i' } },
			],
		};

		const filterSearch = { ...criteria, ...searchCriteria };

		const hsnList: IHsn[] = await Hsn.find(filterSearch)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit)
			.lean();

		const totalCount = await Hsn.countDocuments(filterSearch);

		const data: IHsnWithMeta = {
			data: hsnList,
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

	public async create(hsnInput: IHsn): Promise<string> {
		await this.validateCodeUnique(hsnInput.code);
		const newHsn = await this.save(hsnInput, true);
		return newHsn._id!;
	}

	public async patch(
		id: string,
		updated: IUser,
		reason: string,
		code?: string,
		desc?: string,
		gst?: number,
		is_active?: boolean,
	): Promise<void> {
		const existingHsn = await this.getById(id);

		// if (is_active === undefined && !existingHsn.is_active)
		// 	throw APIError.BusinessError(`Cannot edit inactive hsn`, `ERR_NOTEDITABLE`);

		if (code && code?.toLowerCase() !== existingHsn.code.toLowerCase()) await this.validateCodeUnique(code);
		const updatedHsn: IHsn = {
			...existingHsn,
			code: code ?? existingHsn.code,
			desc: desc ?? existingHsn.desc,
			gst: gst ?? existingHsn.gst,
			is_active: is_active ?? existingHsn.is_active,
			updated,
		};
		await this.save(updatedHsn);
	}

	public async activate(id: string, user: IUser, reason: string, is_active: boolean): Promise<void> {
		await this.patch(id, user, reason, undefined, undefined, undefined, is_active);
	}

	public async validateCodeUnique(code: string): Promise<void> {
		if (await Hsn.exists({ code: { $regex: new RegExp('^' + code + '$', 'i') } })) {
			throw APIError.BusinessError('hsn with the same code already exists in the Database', 'Err_DUPLICATES');
		}
	}
}
