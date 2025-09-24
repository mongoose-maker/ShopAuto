import { Address } from "../../models/Address/Address";
import { AddAddressDto } from "./dto/addAddressDto";
import { UpdateAddressDto } from "./dto/updateAddressDto";

export interface AddressRepository {
  addAddress(dto: AddAddressDto): Address;
  updateAddress(dto: UpdateAddressDto): Address;
  getAllAddress(dto: AddAddressDto): Address;
  getAddressById(dto: AddAddressDto): Address;
  deleteAddress(id: string): Address;
}
