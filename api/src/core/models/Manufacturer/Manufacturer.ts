import { Product } from "../Product/Product.js";
export class Manufacturer {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly productByManufacturer: Product[] = [] // надо ли ?
  ) {} // ?
}
