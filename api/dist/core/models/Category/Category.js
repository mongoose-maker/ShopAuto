import { Product } from "../Product/Product";
export class Category {
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
//# sourceMappingURL=Category.js.map