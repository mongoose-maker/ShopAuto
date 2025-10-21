export class UpdateProductDto {
  constructor(
    readonly idProduct: string | undefined,
    readonly name: string,
    readonly price: number,
    readonly description: string,
    readonly availability: boolean,
    readonly reviews: string,
    readonly rating: number
  ) {}
}
