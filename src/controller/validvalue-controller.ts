import { IUser } from '../interface/user';
import { IValidvalue, IValue } from '../interface/validvalue';
import ValidvalueService from '../service/validvalue-service';

export default class ValidvalueController {
	_validvalueSerice = new ValidvalueService();

	public get = async (filters: any, pagination: any, sort: string) => {
		return await this._validvalueSerice.get(filters, pagination, sort);
	};

	public getByType = async (type: string, fetch?: string) => {
		return await this._validvalueSerice.getByType(type.trim(), fetch?.trim());
	};

	public getValue = async (type: string, key: string) => {
		return await this._validvalueSerice.getValue(type.trim(), key.trim());
	};

	public create = async (vvInput: IValidvalue) => {
		return await this._validvalueSerice.create(vvInput);
	};

	public patch = async (type: string, labelInput: string, reason: string, user: IUser) => {
		return await this._validvalueSerice.patch(type.trim(), reason.trim(), user, labelInput.trim());
	};

	public addValues = async (type: string, values: IValue[], reason: string, user: IUser) => {
		return await this._validvalueSerice.addValues(type.trim(), values, reason.trim(), user);
	};

	public patchValue = async (type: string, key: string, reason: string, user: IUser, label: string, sort: number) => {
		return await this._validvalueSerice.patchValue(type.trim(), key.trim(), reason.trim(), user, label?.trim(), sort);
	};

	public activateValue = async (type: string, key: string, reason: string, user: IUser, active: boolean) => {
		return await this._validvalueSerice.activateValue(type.trim(), key.trim(), reason.trim(), user, active);
	};

	public removeValue = async (type: string, key: string, reason: string, user: IUser) => {
		return await this._validvalueSerice.removeValue(type.trim(), key.trim(), reason, user);
	};

	// protected _validateValues(values: IValue[], inputFields: CommonValidator.IValidateFieldInput[]) {
	// 	values.forEach((value) => {
	// 		const { key, label, sort } = value;
	// 		inputFields.push({ value: key, attributes: ValidvalueAttributes.key });
	// 		inputFields.push({ value: label, attributes: ValidvalueAttributes.value });
	// 		sort && inputFields.push({ value: sort, attributes: ValidvalueAttributes.sort });
	// 	});
	// }
}
