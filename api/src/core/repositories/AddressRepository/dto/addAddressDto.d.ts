import { User } from "../../../models/User/User";
export declare class AddAddressDto {
    readonly userId: User;
    readonly country: string;
    readonly city: string;
    readonly street: string;
    readonly houseNumber: string;
    readonly numberOfApartment: number | null;
    readonly postcode: number;
    constructor(userId: User, country: string, city: string, street: string, houseNumber: string, numberOfApartment: number | null, postcode: number);
}
//# sourceMappingURL=addAddressDto.d.ts.map