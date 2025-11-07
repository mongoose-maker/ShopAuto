import { Address } from "../../models/Address/Address.js";

export interface AddressRepository {
  addAddress(address: Address): Promise<Address>;
  getUserAddress(userId: string): Promise<Address | null>;
  getAddressById(id: string): Promise<Address | null>;
  updateAddress(id: string, updates: Partial<Address>): Promise<Address | null>;
  deleteAddress(id: string): Promise<boolean>;
}
