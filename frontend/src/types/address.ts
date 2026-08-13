export type UserType = "Personal" | "Institute" | "Organization";

export type AddressType = "Home" | "Office" | "Other";

export interface Address {
  id: string;

  fullName: string;
  email: string;
  phone: string;

  userType: UserType;

  addressLine1: string;
  addressLine2: string;

  landmark?: string;

  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;

  addressType: AddressType;

  isDefault: boolean;

  createdAt: string;
  updatedAt: string;
}