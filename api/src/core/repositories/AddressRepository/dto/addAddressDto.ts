import { User } from "../../../models/User/User";

export class AddAddressDto {
  constructor(
    readonly userId: User,
    readonly country: string,
    readonly city: string,
    readonly street: string,
    readonly houseNumber: string,
    readonly numberOfApartment: number | null,
    readonly postcode: number
  ) {}
}
