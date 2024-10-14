import { ITag, ITagWithMeta } from '../interface/tag';
import Tag from '../model/tag';
import { craftPagination, craftQuery, craftSort } from 'filter-library';
import { APIError } from '@hardikgarg2002/node-errorify';
import { IUser } from '../interface/user';

export default class TagService {
	public async getById(id: string, statusError: boolean = false): Promise<ITag> {
		const tag: ITag | null = await Tag.findById(id).lean();
		if (!tag) throw APIError.BusinessError(`Tag does not exist by this id ${id}`, `ERR_NOT_FOUND`);
		if (statusError === true && tag.is_active === false) {
			throw APIError.BusinessError('Tag Inactive', 'ERR_INACTIVE_TAG');
		}
		return tag;
	}

	public async get(filters: any, pagination: any, sort: string): Promise<ITagWithMeta> {
		const criteria = craftQuery(filters);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);
		const tagList: ITag[] = await Tag.find(criteria)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit);
		const totalCount = await Tag.countDocuments(criteria);

		const data: ITagWithMeta = {
			data: tagList,
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

	public async save(input: ITag, isNew: boolean = false): Promise<ITag> {
		const tag = new Tag(input);
		tag.isNew = isNew;
		return (await tag.save()).toObject();
	}

	public search = async (filters: any, pagination: any, sort: string, searchText: string): Promise<ITagWithMeta> => {
		const criteria = craftQuery(filters);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);
		const searchCriteria = {
			$or: [
				{ text: { $regex: searchText, $options: 'i' } },
				{ slug: { $regex: searchText, $options: 'i' } },
				{ 'updated.name': { $regex: searchText, $options: 'i' } },
			],
		};

		const filterSearch = { ...criteria, ...searchCriteria };

		const tagList: ITag[] = await Tag.find(filterSearch)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit)
			.lean();

		const totalCount = await Tag.countDocuments(filterSearch);

		const data: ITagWithMeta = {
			data: tagList,
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

	public async create(tagInput: ITag): Promise<string> {
		const slug = tagInput.text.replace(/[^\w]/g, '').toLowerCase();
		await this.checkDuplicates(slug);
		tagInput.slug = slug;
		const newTag: ITag = await this.save(tagInput, true);

		return newTag._id!;
	}

	public async activate(id: string, updated: IUser, reason: string, is_active: boolean): Promise<void> {
		const existingTag: ITag = await this.getById(id);
		const updatedTag: ITag = { ...existingTag, is_active, updated };
		if (is_active !== existingTag.is_active) {
			const savedTag: ITag = await this.save(updatedTag, false);
		}
	}

	public async checkDuplicates(slug: string): Promise<void> {
		if (await Tag.exists({ slug })) {
			throw APIError.BusinessError('Tag with the same text already exists in the Database', 'Err_DUPLICATES');
		}
	}

	public makeSortCriteria(sort: string): any {
		const [field, sortOption] = sort.split(':');
		return { [field]: sortOption };
	}
}
