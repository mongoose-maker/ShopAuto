import { CartItem } from "../models/Cart/CartItem.js";
export class CartItemService {
    constructor(cartItemRepository, productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }
    async addItem(dto) {
        // Проверить существование продукта
        const product = await this.productRepository.getProductById(dto.productId);
        if (!product) {
            throw new Error(`Product with id ${dto.productId} not found`);
        }
        // Проверить доступность продукта
        if (!product.availability) {
            throw new Error(`Product with id ${dto.productId} is not available`);
        }
        // Создать элемент корзины
        const cartItem = new CartItem(undefined, dto.cartId, dto.productId, dto.quantity, product);
        return await this.cartItemRepository.addItem(cartItem);
    }
    async updateItem(cartId, productId, dto) {
        if (dto.quantity !== undefined && dto.quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
        const quantity = dto.quantity ?? 1;
        return await this.cartItemRepository.updateItem(cartId, productId, quantity);
    }
    async getItemList(cartId) {
        return await this.cartItemRepository.getItemList(cartId);
    }
    async removeItem(cartId, productId) {
        return await this.cartItemRepository.removeItem(cartId, productId);
    }
    async clearCart(cartId) {
        return await this.cartItemRepository.clearCart(cartId);
    }
}
//# sourceMappingURL=CartItemService.js.map