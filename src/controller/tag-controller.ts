import { ITag, ITagWithMeta } from '../interface/tag';
import TagService from '../service/tag-service';
import { IUser } from '../interface/user';

export default class TagController {
	private _tagService = new TagService();

	public create = async (tagInput: ITag): Promise<string> => {
		return await this._tagService.create(tagInput);
	};

	public get = async (filters: any, pagination: any, sort: string): Promise<ITagWithMeta> => {
		return await this._tagService.get(filters, pagination, sort);
	};

	public getById = async (id: string): Promise<ITag> => {
		return await this._tagService.getById(id?.trim());
	};

	public search = async (filters: any, pagination: any, sort: string, searchText: string): Promise<ITagWithMeta> => {
		return await this._tagService.search(filters, pagination, sort, searchText.trim());
	};

	public activate = async (id: string, user: IUser, reason: string, is_active: boolean): Promise<void> => {
		await this._tagService.activate(id, user, reason, is_active);
	};
}
