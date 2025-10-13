import { Category } from "../Category/Category";
export declare class Product {
    readonly id: string;
    readonly idProduct: string;
    readonly name: string;
    readonly manufacturer: string;
    readonly category: Category;
    readonly description: string;
    readonly price: number;
    readonly availability: boolean;
    readonly reviews: string;
    readonly rating: number;
    constructor(id: string, idProduct: string, name: string, manufacturer: string, category: Category, description: string, // Text ?
    price: number, availability: boolean, reviews: string, rating: number);
}
//# sourceMappingURL=Product.d.ts.map