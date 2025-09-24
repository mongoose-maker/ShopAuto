export class AddProductDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly manufacturer: string,
    readonly category: string,
    readonly subCategory: string,
    readonly compatibility: string,
    readonly description: string,
    readonly availability: boolean,
    readonly price: number
  ) {}
}
