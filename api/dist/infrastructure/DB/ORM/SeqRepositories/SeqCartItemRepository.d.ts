import type { CartItemRepository } from "../../../../core/repositories/CartItem/CartItemRepository.js";
import { CartItem } from "../../../../core/models/Cart/CartItem.js";
export declare class SeqCartItemRepository implements CartItemRepository {
    addItem(item: CartItem): Promise<CartItem>;
    updateItem(cartId: string, productId: string, quantity: number): Promise<CartItem | null>;
    getItemList(cartId: string): Promise<CartItem[] | null>;
    removeItem(cartId: string, productId: string): Promise<boolean>;
    clearCart(cartId: string): Promise<boolean>;
}
//# sourceMappingURL=SeqCartItemRepository.d.ts.map