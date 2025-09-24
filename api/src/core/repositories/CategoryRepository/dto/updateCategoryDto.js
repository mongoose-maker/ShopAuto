import { Category } from "../../../models/Category/Category";
import { Product } from "../../../models/Product/Product";
export class UpdateCategoryDto {
    name;
    subCategory;
    listProducts;
    constructor(name, subCategory, listProducts = []) {
        this.name = name;
        this.subCategory = subCategory;
        this.listProducts = listProducts;
    }
}
//# sourceMappingURL=updateCategoryDto.js.map