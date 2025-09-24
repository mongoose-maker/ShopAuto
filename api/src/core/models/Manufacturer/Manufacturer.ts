import { Product } from "../Product/Product";
export class Manufacturer {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly productByManufacturer: Product[] = [] // надо ли ?
  ) {} // ?
}
