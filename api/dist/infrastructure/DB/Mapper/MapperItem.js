import { CartItem } from "../../../core/models/Cart/CartItem.js";
import { ProductMapper } from "./MapperProduct.js";
export class ItemMapper {
    static toDomain(raw) {
        const product = raw.product
            ? ProductMapper.toDomain(raw.product)
            : undefined;
        return new CartItem(raw.id?.toString(), raw.cartId, raw.productId, raw.quantity, product);
    }
    static toPersistence(item) {
        if (!item.product)
            throw new Error("Product association is required to persist cart item price");
        return {
            cartId: item.cartId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
        };
    }
}
//# sourceMappingURL=MapperItem.js.map