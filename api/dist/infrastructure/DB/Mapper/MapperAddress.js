import { Address } from '../../../core/models/Address/Address.js';
export class AddressMapper {
    static toDomain(raw) {
        return new Address(raw.id?.toString(), raw.userId, raw.country, raw.city, raw.street, raw.houseNumber, raw.numberOfApartment, raw.postcode);
    }
    static toPersistence(address) {
        return {
            userId: address.userId,
            country: address.country,
            city: address.city,
            street: address.street,
            houseNumber: address.houseNumber,
            numberOfApartment: address.numberOfApartment,
            postcode: address.postcode,
        };
    }
}
//# sourceMappingURL=MapperAddress.js.map