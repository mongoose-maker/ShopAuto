import { Product } from "../../../models/Product/Product";

export class AddManufacturerDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly descriptionManufacturer: string, // ?
    readonly productByManufacturer: Product
  ) {}
}
