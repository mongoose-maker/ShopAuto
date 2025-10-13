import { Category } from "../Category/Category.js";

export class Product {
  constructor(
    readonly id: string,
    readonly idProduct: string,
    readonly name: string,
    readonly manufacturer: string,
    readonly category: Category,
    readonly description: string, // Text ?
    readonly price: number,
    readonly availability: boolean,
    readonly reviews: string,
    readonly rating: number
  ) {}
}
