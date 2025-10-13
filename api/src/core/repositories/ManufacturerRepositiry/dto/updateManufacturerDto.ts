import { Product } from "../../../models/Product/Product.js";

export class updateManufacturerDto {
  constructor(
    readonly name: string,
    readonly descriptionManufacturer: string,
    readonly productByManufacturer: Product[] = []
  ) {}
}
