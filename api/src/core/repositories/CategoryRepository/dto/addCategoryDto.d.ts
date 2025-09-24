import { Category } from "../../../models/Category/Category";
import { Product } from "../../../models/Product/Product";
export declare class AddCategoryDto {
    readonly id: string;
    readonly name: string;
    readonly subCategory?: Category;
    readonly listProducts: Product[];
    constructor(id: string, name: string, subCategory?: Category, listProducts?: Product[]);
}
//# sourceMappingURL=addCategoryDto.d.ts.map