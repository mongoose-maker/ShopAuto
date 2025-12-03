import { Cart } from '../models/Cart/Cart.js';
import type { CartRepository } from '../repositories/CartRepository/CartRepository.js';
import type { ProductRepository } from '../repositories/ProductRepository/ProductRepository.js';
export declare class CartService {
    private readonly cartRepository;
    private readonly productRepository;
    constructor(cartRepository: CartRepository, productRepository: ProductRepository);
    getCartByUserId(userId: string): Promise<Cart | null>;
    addItemToCart(userId: string, productId: string, quantity: number): Promise<Cart>;
    updateItemInCart(userId: string, itemId: string, quantity: number): Promise<Cart>;
    removeItemFromCart(userId: string, itemId: string): Promise<Cart>;
    clearCart(userId: string): Promise<void>;
}
//# sourceMappingURL=CartService.d.ts.map