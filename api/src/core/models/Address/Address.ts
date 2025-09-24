export class Address {
  constructor(
    readonly id: string,
    readonly country: string,
    readonly city: string,
    readonly street: string,
    readonly houseNumber: string,
    readonly numberOfApartment: number | null,
    readonly postcode: number
  ) {}
}
