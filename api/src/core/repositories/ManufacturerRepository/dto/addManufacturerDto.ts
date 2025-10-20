import { Product } from "../../../models/Product/Product.js";

export class AddManufacturerDto {
  constructor(
    readonly id: undefined | string,
    readonly name: string,
    readonly descriptionManufacturer: string, // ?
    readonly products: Product[]
  ) {}
}
