import { Address } from "../../models/Address/Address.js";
import { AddAddressDto } from "./dto/addAddressDto.js";
import { UpdateAddressDto } from "./dto/updateAddressDto.js";

export interface AddressRepository {
  addAddress(dto: AddAddressDto): Address;
  updateAddress(dto: UpdateAddressDto): Address;
  getAllAddress(dto: AddAddressDto): Address;
  getAddressById(dto: AddAddressDto): Address;
  deleteAddress(id: string): Address;
}
