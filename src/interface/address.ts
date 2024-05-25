export enum AddressType {
  HOME = "HOME",
  WORK = "WORK",
  HOTEL = "HOTEL",
  OTHER = "OTHER",
}

export interface IAddress {
  _id?: any;
  name: string;
  contact_phone: string;
  address_type: AddressType;
  other_address_type?: string;
  address: string;
  landmark?: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  created_at?: Date;
  updated_at?: Date;
}
