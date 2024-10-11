import FeatureService from '../service/feature-service';
import { IFeature, IFeatureWithMeta } from '../interface/feature';
import { IUser } from '../interface/user';
import ValidvalueService from '../service/validvalue-service';

export default class FeatureController {
	private _featureService = new FeatureService();
	private _validvalueService = new ValidvalueService();

	public get = async (filters: any, pagination: any, sort: string) => {
		return await this._featureService.get(filters, pagination, sort);
	};

	public getById = async (id: string) => {
		return await this._featureService.getById(id.trim());
	};

	public search = async (
		filters: any,
		pagination: any,
		sort: string,
		searchText: string,
	): Promise<IFeatureWithMeta> => {
		return await this._featureService.search(filters, pagination, sort, searchText.trim());
	};

	public create = async (featureInput: IFeature) => {
		/// validate the type from the validvalue value key of type feature
		await this._validvalueService.getValue('feature', featureInput.type);
		return await this._featureService.create(featureInput);
	};

	public patch = async (user: IUser, id: string, reason: string, name?: string, desc?: string, sort?: number) => {
		return await this._featureService.patch(user, id.trim(), reason.trim(), name?.trim(), desc?.trim(), sort);
	};

	public remove = async (user: IUser, id: string, reason: string) => {
		return await this._featureService.remove(user, id.trim(), reason.trim());
	};
}
