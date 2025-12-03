import { Cart } from '../models/Cart/Cart.js';
import type { CartRepository } from '../repositories/CartRepository/CartRepository.js';
import type { ProductRepository } from '../repositories/ProductRepository/ProductRepository.js';

export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async getCartByUserId(userId: string): Promise<Cart | null> {
    return await this.cartRepository.getByUserId(userId);
  }

  async addItemToCart(userId: string, productId: string, quantity: number): Promise<Cart> {
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

  async updateItemInCart(userId: string, itemId: string, quantity: number): Promise<Cart> {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    return await this.cartRepository.updateItem(userId, itemId, quantity);
  }

  async removeItemFromCart(userId: string, itemId: string): Promise<Cart> {
    return await this.cartRepository.removeItem(userId, itemId);
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartRepository.clear(userId);
  }
}
