import { Category } from "../../../models/Category/Category";
import { Product } from "../../../models/Product/Product";
export declare class UpdateCategoryDto {
    readonly name: string;
    readonly subCategory?: Category;
    readonly listProducts: Product[];
    constructor(name: string, subCategory?: Category, listProducts?: Product[]);
}
//# sourceMappingURL=updateCategoryDto.d.ts.map