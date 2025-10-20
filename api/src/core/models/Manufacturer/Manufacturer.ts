import { Product } from "../Product/Product.js";
export class Manufacturer {
  constructor(
    readonly id: undefined | string,
    readonly name: string,
    readonly descriptionManufacturer: string,
    readonly products: Product[] = [] // надо ли ?
  ) {} // ?
}
