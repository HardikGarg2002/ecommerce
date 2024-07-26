import { ITag } from '../interface/tag';
import * as tagService from '../service/tag-service';

export default class TagController {
	public create = async (tagInput: ITag): Promise<string> => {
		return (await tagService.create(tagInput))._id;
	};

	public get = async (): Promise<ITag[]> => {
		return await tagService.get();
	};

	public getById = async (id: string): Promise<ITag> => {
		return await tagService.getById(id?.trim());
	};
	public activate = async (id: string, is_active: boolean): Promise<void> => {
		await tagService.patchStatus(id, is_active);
	};
}
