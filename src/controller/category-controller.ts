import CategoryService from '../service/category-service';
import { ICategory, ICategoryWithMeta } from '../interface/category';
import { IUser } from '../interface/user';

export default class CategoryController {
	private _categoryService = new CategoryService();

	public create = async (catInput: ICategory) => {
		return await this._categoryService.create(catInput);
	};

	public get = async (filters: any, pagination: any, sort: string) => {
		const categoriesWithMeta: ICategoryWithMeta = await this._categoryService.get(filters, pagination, sort);
		return categoriesWithMeta;
	};

	public getById = async (id: string) => {
		return await this._categoryService.getById(id.trim());
	};

	public search = async (
		filters: any,
		pagination: any,
		sort: string,
		searchText: string,
	): Promise<ICategoryWithMeta> => {
		return await this._categoryService.search(filters, pagination, sort, searchText.trim());
	};

	public patch = async (
		id: string,
		reason: string,
		user: IUser,
		name?: string,
		desc?: string,
		img?: string,
		sort?: number,
	) => {
		return await this._categoryService.patch(
			id.trim(),
			reason.trim(),
			user,
			name?.trim(),
			desc?.trim(),
			img?.trim(),
			sort,
		);
	};
	public remove = async (id: string, reason: string, user: IUser) => {
		return await this._categoryService.remove(id.trim(), reason.trim(), user);
	};

	public activate = async (id: string, reason: string, user: IUser, active: boolean) => {
		return await this._categoryService.activate(id.trim(), reason.trim(), user, active);
	};
}
