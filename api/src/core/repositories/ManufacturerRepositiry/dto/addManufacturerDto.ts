import { Product } from "../../../models/Product/Product.js";

export class AddManufacturerDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly descriptionManufacturer: string, // ?
    readonly productByManufacturer: Product
  ) {}
}
