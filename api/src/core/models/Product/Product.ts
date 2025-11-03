import { Category } from "../Category/Category.js";
import { Manufacturer } from "../Manufacturer/Manufacturer.js";
export class Product {
  constructor(
    readonly id: string | undefined,
    readonly idProduct: string,
    readonly name: string,
    readonly manufacturer: Manufacturer,
    readonly category: Category,
    readonly description: string,
    readonly price: number,
    readonly availability: boolean,
    readonly rating: number
  ) {}
}

// import { Category } from "../Category/Category.js";
// import type { Manufacturer } from "../Manufacturer/Manufacturer.js";

// export class Product {
//   constructor(
//     readonly id: undefined | number,
//     readonly idProduct: undefined | string,
//     readonly name: string,
//     readonly manufacturerId: Manufacturer, //?
//     readonly categoryId: Category,
//     readonly description: string, // Text ?
//     readonly price: number,
//     readonly availability: boolean,
//     // readonly reviews: string,  СОЗДАТЬ ОТДЕЛЬНУЮ ТАБЛИЦУ
//     readonly rating: number
//   ) {}
// }
