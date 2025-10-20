import { Category } from "../Category/Category.js";
import type { Manufacturer } from "../Manufacturer/Manufacturer.js";

export class Product {
  constructor(
    readonly id: undefined | string,
    readonly idProduct: undefined | string,
    readonly name: string,
    readonly manufacturerId: Manufacturer, //?
    readonly categoryId: Category,
    readonly description: string, // Text ?
    readonly price: number,
    readonly availability: boolean,
    readonly reviews: string,
    readonly rating: number
  ) {}
}
