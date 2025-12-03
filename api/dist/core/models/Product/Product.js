import { Category } from '../Category/Category.js';
import { Manufacturer } from '../Manufacturer/Manufacturer.js';
export class Product {
    constructor(id, idProduct, name, manufacturer, category, description, price, availability, rating) {
        this.id = id;
        this.idProduct = idProduct;
        this.name = name;
        this.manufacturer = manufacturer;
        this.category = category;
        this.description = description;
        this.price = price;
        this.availability = availability;
        this.rating = rating;
    }
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
//# sourceMappingURL=Product.js.map