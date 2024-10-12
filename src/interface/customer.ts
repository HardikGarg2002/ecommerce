import { IPagination } from './pagination';
import { IAddress } from './address';

export enum CustomerStatus {
	ACTIVE = 'ACTIVE',
	BLACKLISTED = 'BLACKLISTED',
}

export default interface ICustomer {
	_id?: string;
	auth_id: string;
	name: string;
	mobile: string;
	email?: string;
	address?: IAddress[];
	creation_date?: Date;
	status?: CustomerStatus;
}

export interface ICustomerWithMeta {
	data: ICustomer[];
	meta: {
		pagination: IPagination;
	};
}
