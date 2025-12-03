import { Category } from '../../../core/models/Category/Category.js';
import {} from './MapperProduct.js';
export class CategoryMapper {
    static toDomain(raw) {
        // const products = raw.products
        //   ? raw.products.map(ProductMapper.toDomain)
        //   : [];
        return new Category(raw.id?.toString(), raw.name);
    }
    static toPersistence(category) {
        return {
            id: category.id,
            name: category.name,
        };
    }
}
//# sourceMappingURL=MapperCategory.js.map