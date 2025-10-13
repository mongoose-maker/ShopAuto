import { Category } from "../../../models/Category/Category";
import { Product } from "../../../models/Product/Product";
export class AddCategoryDto {
    id;
    name;
    subCategory;
    listProducts;
    constructor(id, name, subCategory, listProducts = []) {
        this.id = id;
        this.name = name;
        this.subCategory = subCategory;
        this.listProducts = listProducts;
    }
}
//# sourceMappingURL=addCategoryDto.js.map