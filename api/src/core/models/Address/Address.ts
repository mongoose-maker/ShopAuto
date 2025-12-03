export class Address {
  constructor(
    readonly id: string | undefined,
    readonly userId: string,
    readonly country: string,
    readonly city: string,
    readonly street: string,
    readonly houseNumber: number,
    readonly numberOfApartment: number,
    readonly postcode: number,
  ) {
    //isDefault: boolean
  }
}
