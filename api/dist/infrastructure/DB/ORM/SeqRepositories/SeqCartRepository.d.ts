import type { CartRepository } from "../../../../core/repositories/CartRepository/CartRepository.js";
import { Cart } from "../../../../core/models/Cart/Cart.js";
export declare class SeqCartRepository implements CartRepository {
    getByUserId(userId: string): Promise<Cart | null>;
    addItem(userId: string, productId: string, quantity: number): Promise<Cart>;
    updateItem(userId: string, itemId: string, quantity: number): Promise<Cart>;
    removeItem(userId: string, itemId: string): Promise<Cart>;
    clear(userId: string): Promise<void>;
}
//# sourceMappingURL=SeqCartRepository.d.ts.map