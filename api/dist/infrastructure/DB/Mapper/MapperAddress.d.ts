import { Address } from '../../../core/models/Address/Address.js';
import type { SeqAddressAttributes } from '../ORM/SeqModel/SeqAddressModel.js';
export declare class AddressMapper {
    static toDomain(raw: SeqAddressAttributes): Address;
    static toPersistence(address: Address): Omit<SeqAddressAttributes, 'id'>;
}
//# sourceMappingURL=MapperAddress.d.ts.map