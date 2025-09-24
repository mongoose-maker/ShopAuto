export class UpdateProductDto {
  constructor(
    readonly price: number,
    readonly description: string,
    readonly availability: boolean,
    readonly rating: number
  ) {}
}
