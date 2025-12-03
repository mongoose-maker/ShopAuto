import { Cart } from '../models/Cart/Cart.js';
export class CartService {
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async getCartByUserId(userId) {
        return await this.cartRepository.getByUserId(userId);
    }
    async addItemToCart(userId, productId, quantity) {
        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
        if (!product.availability) {
            throw new Error(`Product with id ${productId} is not available`);
        }
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        return await this.cartRepository.addItem(userId, productId, quantity);
    }
    async updateItemInCart(userId, itemId, quantity) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        return await this.cartRepository.updateItem(userId, itemId, quantity);
    }
    async removeItemFromCart(userId, itemId) {
        return await this.cartRepository.removeItem(userId, itemId);
    }
    async clearCart(userId) {
        await this.cartRepository.clear(userId);
    }
}
//# sourceMappingURL=CartService.js.map