import type { AddressRepository } from "../../../../core/repositories/AddressRepository/AddressRepository.js";
import { Address } from "../../../../core/models/Address/Address.js";
export declare class SeqAddressRepository implements AddressRepository {
    addAddress(address: Address): Promise<Address>;
    getAddressById(id: string): Promise<Address | null>;
    getUserAddress(userId: string): Promise<Address | null>;
    updateAddress(id: string, address: Address): Promise<Address | null>;
    deleteAddress(id: string): Promise<boolean>;
}
//# sourceMappingURL=SeqAddressRepository.d.ts.map