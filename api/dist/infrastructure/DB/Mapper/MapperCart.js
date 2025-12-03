import { Cart } from '../../../core/models/Cart/Cart.js';
import { ItemMapper } from './MapperItem.js';
export class CartMapper {
    static toDomain(raw) {
        const items = raw.items?.map(item => ItemMapper.toDomain(item)) ?? [];
        return new Cart(raw.id, raw.userId, items);
    }
    static toPersistence(cart) {
        return {
            userId: cart.userId,
        };
    }
}
//# sourceMappingURL=MapperCart.js.map