import { Address } from '../models/Address/Address.js';
export class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async addAddress(dto) {
        const address = new Address(undefined, dto.userId, dto.country, dto.city, dto.street, dto.houseNumber, dto.numberOfApartment ?? 0, dto.postcode);
        return await this.addressRepository.addAddress(address);
    }
    async getAddressById(id) {
        return await this.addressRepository.getAddressById(id);
    }
    async getUserAddress(userId) {
        return await this.addressRepository.getUserAddress(userId);
    }
    async updateAddress(id, dto) {
        const existingAddress = await this.addressRepository.getAddressById(id);
        if (!existingAddress) {
            throw new Error(`Address with id ${id} not found`);
        }
        const updatedAddress = new Address(existingAddress.id, existingAddress.userId, dto.country ?? existingAddress.country, dto.city ?? existingAddress.city, dto.street ?? existingAddress.street, dto.houseNumber ?? existingAddress.houseNumber, dto.numberOfApartment ?? existingAddress.numberOfApartment, dto.postcode ?? existingAddress.postcode);
        return await this.addressRepository.updateAddress(id, updatedAddress);
    }
    async deleteAddress(id) {
        return await this.addressRepository.deleteAddress(id);
    }
}
//# sourceMappingURL=AddressService.js.map