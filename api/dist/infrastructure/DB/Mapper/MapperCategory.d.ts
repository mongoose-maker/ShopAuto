import { Category } from "../../../core/models/Category/Category.js";
import type { SeqCategoryAttributes } from "../ORM/SeqModel/SeqCategoryModel.js";
import { type SeqProductWithRelations } from "./MapperProduct.js";
export type SeqCategoryWithProducts = SeqCategoryAttributes & {
    products?: SeqProductWithRelations[];
};
export declare class CategoryMapper {
    static toDomain(raw: SeqCategoryWithProducts): Category;
    static toPersistence(category: Category): any;
}
//# sourceMappingURL=MapperCategory.d.ts.map