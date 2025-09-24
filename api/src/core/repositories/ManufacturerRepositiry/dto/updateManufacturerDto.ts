import { Product } from "../../../models/Product/Product";

export class updateManufacturerDto {
  constructor(
    readonly name: string,
    readonly descriptionManufacturer: string,
    readonly productByManufacturer: Product[] = []
  ) {}
}
