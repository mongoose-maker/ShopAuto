import { Address } from "../models/Address/Address.js";
import type { AddressRepository } from "../repositories/AddressRepository/AddressRepository.js";
import type { AddAddressDto } from "../repositories/AddressRepository/dto/addAddressDto.js";
import type { UpdateAddressDto } from "../repositories/AddressRepository/dto/updateAddressDto.js";

export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async addAddress(dto: AddAddressDto): Promise<Address> {
    const address = new Address(
      undefined,
      dto.userId,
      dto.country,
      dto.city,
      dto.street,
      dto.houseNumber,
      dto.numberOfApartment ?? 0,
      dto.postcode
    );

    return await this.addressRepository.addAddress(address);
  }

  async getAddressById(id: string): Promise<Address | null> {
    return await this.addressRepository.getAddressById(id);
  }

  async getUserAddress(userId: string): Promise<Address | null> {
    return await this.addressRepository.getUserAddress(userId);
  }

  async updateAddress(
    id: string,
    dto: UpdateAddressDto
  ): Promise<Address | null> {
    const existingAddress = await this.addressRepository.getAddressById(id);
    if (!existingAddress) {
      throw new Error(`Address with id ${id} not found`);
    }

    const updatedAddress = new Address(
      existingAddress.id,
      existingAddress.userId,
      dto.country ?? existingAddress.country,
      dto.city ?? existingAddress.city,
      dto.street ?? existingAddress.street,
      dto.houseNumber ?? existingAddress.houseNumber,
      dto.numberOfApartment ?? existingAddress.numberOfApartment,
      dto.postcode ?? existingAddress.postcode
    );

    return await this.addressRepository.updateAddress(id, updatedAddress);
  }

  async deleteAddress(id: string): Promise<boolean> {
    return await this.addressRepository.deleteAddress(id);
  }
}
