import { CartItem } from '../models/Cart/CartItem.js';
import type { CartItemRepository } from '../repositories/CartItem/CartItemRepository.js';
import type { AddItemDto } from '../repositories/CartItem/dto/addItemDto.js';
import type { UpdateItemDto } from '../repositories/CartItem/dto/updateItemDto.js';
import type { ProductRepository } from '../repositories/ProductRepository/ProductRepository.js';

export class CartItemService {
  constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async addItem(dto: AddItemDto): Promise<CartItem> {
    const product = await this.productRepository.getProductById(dto.productId);
    if (!product) {
      throw new Error(`Product with id ${dto.productId} not found`);
    }

    if (!product.availability) {
      throw new Error(`Product with id ${dto.productId} is not available`);
    }

    const cartItem = new CartItem(undefined, dto.cartId, dto.productId, dto.quantity, product);

    return await this.cartItemRepository.addItem(cartItem);
  }

  async updateItem(
    cartId: string,
    productId: string,
    dto: UpdateItemDto,
  ): Promise<CartItem | null> {
    if (dto.quantity !== undefined && dto.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const quantity = dto.quantity ?? 1;
    return await this.cartItemRepository.updateItem(cartId, productId, quantity);
  }

  async getItemList(cartId: string): Promise<CartItem[] | null> {
    return await this.cartItemRepository.getItemList(cartId);
  }

  async removeItem(cartId: string, productId: string): Promise<boolean> {
    return await this.cartItemRepository.removeItem(cartId, productId);
  }

  async clearCart(cartId: string): Promise<boolean> {
    return await this.cartItemRepository.clearCart(cartId);
  }
}
