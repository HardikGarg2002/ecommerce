import Category from '../model/category';
import { ICategory, ICategoryWithMeta } from '../interface/category';
import SubcategoryService from './subcategory-service';
import { IUser } from '../interface/user';
import ProductService from './product-service';
import { craftPagination, craftQuery, craftSort } from 'filter-library';
import { APIError } from '@hardikgarg2002/node-errorify';

export default class CategoryService {
	_subCategoryService = new SubcategoryService();
	_productService = new ProductService();
	allowedQueryFields = ['name', 'desc', 'code', 'is_active', 'sort', 'created.name', 'updated.name'];

	public async get(filters: any, pagination: any, sort: string): Promise<ICategoryWithMeta> {
		const criteria = craftQuery(filters, this.allowedQueryFields);
		const { skip, limit } = craftPagination(pagination.page, pagination.pageSize);
		const sortOptions = craftSort(sort);
		const categoryList: ICategory[] = await Category.find(criteria)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit);
		const totalCount = await Category.countDocuments(criteria);
		const data: ICategoryWithMeta = {
			data: categoryList,
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
	public async getById(id: string): Promise<ICategory> {
		const category = await Category.findById(id).lean();
		if (!category) {
			throw APIError.BusinessError('category not found', 'ERR_NOT_FOUND');
		}
		return category;
	}
	public async getByCode(code: string, statusError: boolean = false): Promise<ICategory> {
		const category = await Category.findOne({ code }).lean();
		if (!category) {
			throw APIError.BusinessError('category not found', 'ERR_NOT_FOUND');
		}
		if (statusError === true && category.is_active === false) {
			throw APIError.BusinessError('category Inactive', 'ERR_INACTIVE_CATEGORY');
		}
		return category;
	}

	public search = async (
		filters: any,
		pagination: any,
		sort: string,
		searchText: string,
	): Promise<ICategoryWithMeta> => {
		const criteria = craftQuery(filters, this.allowedQueryFields);
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

		const categoryList: ICategory[] = await Category.find(filterSearch)
			.sort(sortOptions as any)
			.collation({ locale: 'en' })
			.skip(skip)
			.limit(limit)
			.lean();

		const totalCount = await Category.countDocuments(filterSearch);

		const data: ICategoryWithMeta = {
			data: categoryList,
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

	public async create(categoryInput: ICategory): Promise<string> {
		await this._validateNameAndCodeUnique(categoryInput.name, categoryInput.code);
		const newCategory = await this.save(categoryInput, true);
		return newCategory._id!;
	}

	public async patch(
		id: string,
		reason: string,
		updated: IUser,
		nameInput?: string,
		desc?: string,
		img?: string,
		sortInput?: number,
		is_activeInput?: boolean,
	) {
		const existingCategory = await this.getById(id);
		// if (is_activeInput === undefined && !existingCategory.is_active) {
		// 	throw APIError.BusinessError(`Inactive Category can not be modified`, 'ERR_CATEGORY_INACTIVE');
		// }
		nameInput &&
			existingCategory.name.toLowerCase() != nameInput.toLowerCase() &&
			(await this._validateNameAndCodeUnique(nameInput));
		/// Deactivate the sub categories similarly to be done for the product also
		if (is_activeInput !== undefined && is_activeInput === false) {
			await this._subCategoryService.deactivateByCategoryCode(existingCategory.code!, updated);
			await this._productService.deactivateByCategoryCode(existingCategory.code!, updated);
		}
		const updatedCategory: ICategory = {
			...existingCategory,
			name: nameInput ? nameInput : existingCategory.name,
			desc: desc ?? existingCategory.desc,
			img_url: img ?? existingCategory.img_url,
			sort: sortInput ?? existingCategory.sort,
			is_active: is_activeInput ?? existingCategory.is_active,
			updated,
		};
		const savedCategory = await this.save(updatedCategory);
	}

	public async activate(id: string, reason: string, user: IUser, status: boolean): Promise<void> {
		await this.patch(id, reason, user, undefined, undefined, undefined, undefined, status);
	}
	public async remove(id: string, reason: string, user: IUser) {
		const category = await this.getById(id);
		const subcategories = await this._subCategoryService.getByCategoryCode(category.code!);
		if (subcategories.length > 0) {
			throw APIError.BusinessError('category associated to the subcategory cannot be deleted', 'ERR_EXIST');
		}
		await Category.findByIdAndDelete(id);
	}

	public async save(categoryInput: ICategory, isNew: boolean = false): Promise<ICategory> {
		const category = new Category(categoryInput);
		category.isNew = isNew;
		return (await category.save()).toObject();
	}

	// public async validateCategoryCode(code: string) {
	// 	const matchedCategory = await this.get({ code: { $eqi: `${code}` } }, undefined, 'name:asc');
	// 	if (matchedCategory.data.length < 1) {
	// 		throw APIError.BusinessError(
	// 			`no category exists with code : ${code.toUpperCase()} in database`,
	// 			'ERR_INVALID_CATEGORY',
	// 		);
	// 	}
	// }

	private async _validateNameAndCodeUnique(name: string, code?: string) {
		const matchedCat: ICategory[] = await Category.find({
			$or: [
				{ name: { $regex: new RegExp(`^${name?.trim()}$`), $options: 'i' } },
				{ code: { $regex: new RegExp(`^${code?.trim()}$`), $options: 'i' } },
			],
		});
		if (matchedCat.length > 0) {
			throw APIError.BusinessError('category with the same name and code already exists in database', 'ERR_DUPLICATE');
		}
	}
}
