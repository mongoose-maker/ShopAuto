import { User } from "../../../models/User/User";
export class AddAddressDto {
    userId;
    country;
    city;
    street;
    houseNumber;
    numberOfApartment;
    postcode;
    constructor(userId, country, city, street, houseNumber, numberOfApartment, postcode) {
        this.userId = userId;
        this.country = country;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.numberOfApartment = numberOfApartment;
        this.postcode = postcode;
    }
}
//# sourceMappingURL=addAddressDto.js.map