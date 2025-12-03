import { Address } from '../models/Address/Address.js';
import type { AddressRepository } from '../repositories/AddressRepository/AddressRepository.js';
import type { AddAddressDto } from '../repositories/AddressRepository/dto/addAddressDto.js';
import type { UpdateAddressDto } from '../repositories/AddressRepository/dto/updateAddressDto.js';
export declare class AddressService {
    private readonly addressRepository;
    constructor(addressRepository: AddressRepository);
    addAddress(dto: AddAddressDto): Promise<Address>;
    getAddressById(id: string): Promise<Address | null>;
    getUserAddress(userId: string): Promise<Address | null>;
    updateAddress(id: string, dto: UpdateAddressDto): Promise<Address | null>;
    deleteAddress(id: string): Promise<boolean>;
}
//# sourceMappingURL=AddressService.d.ts.map