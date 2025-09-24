import { Product } from "../Product/Product";
export declare class Category {
    readonly id: string;
    readonly name: string;
    readonly subCategory?: Category | undefined;
    readonly listProducts: Product[];
    constructor(id: string, name: string, subCategory?: Category | undefined, listProducts?: Product[]);
}
//# sourceMappingURL=Category.d.ts.map