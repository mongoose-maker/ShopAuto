import { CartItem } from '../models/Cart/CartItem.js';
import type { CartItemRepository } from '../repositories/CartItem/CartItemRepository.js';
import type { AddItemDto } from '../repositories/CartItem/dto/addItemDto.js';
import type { UpdateItemDto } from '../repositories/CartItem/dto/updateItemDto.js';
import type { ProductRepository } from '../repositories/ProductRepository/ProductRepository.js';
export declare class CartItemService {
    private readonly cartItemRepository;
    private readonly productRepository;
    constructor(cartItemRepository: CartItemRepository, productRepository: ProductRepository);
    addItem(dto: AddItemDto): Promise<CartItem>;
    updateItem(cartId: string, productId: string, dto: UpdateItemDto): Promise<CartItem | null>;
    getItemList(cartId: string): Promise<CartItem[] | null>;
    removeItem(cartId: string, productId: string): Promise<boolean>;
    clearCart(cartId: string): Promise<boolean>;
}
//# sourceMappingURL=CartItemService.d.ts.map