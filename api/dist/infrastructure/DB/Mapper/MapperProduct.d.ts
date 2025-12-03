import { Product } from '../../../core/models/Product/Product.js';
import type { SeqProductAttributes } from '../ORM/SeqModel/SeqProductModel.js';
import type { SeqManufacturerAttributes } from '../ORM/SeqModel/SeqManufacturerModel.js';
import type { SeqCategoryAttributes } from '../ORM/SeqModel/SeqCategoryModel.js';
export type SeqProductWithRelations = SeqProductAttributes & {
    manufacturer?: SeqManufacturerAttributes;
    category?: SeqCategoryAttributes;
};
export declare class ProductMapper {
    static toDomain(raw: SeqProductWithRelations): Product;
    static toPersistence(product: Product): Omit<SeqProductAttributes, 'id'>;
}
//# sourceMappingURL=MapperProduct.d.ts.map