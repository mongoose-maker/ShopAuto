import { Category } from '../Category/Category.js';
import { Manufacturer } from '../Manufacturer/Manufacturer.js';
export declare class Product {
    readonly id: string | undefined;
    readonly idProduct: string;
    readonly name: string;
    readonly manufacturer: Manufacturer;
    readonly category: Category;
    readonly description: string;
    readonly price: number;
    readonly availability: boolean;
    readonly rating: number;
    constructor(id: string | undefined, idProduct: string, name: string, manufacturer: Manufacturer, category: Category, description: string, price: number, availability: boolean, rating: number);
}
//# sourceMappingURL=Product.d.ts.map