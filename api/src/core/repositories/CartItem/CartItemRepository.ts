import { CartItem } from "../../models/Cart/CartItem.js";

export interface CartItemRepository {
  addItem(item: CartItem): Promise<CartItem>;
  updateItem(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartItem | null>;
  getItemList(cartId: string): Promise<CartItem[] | null>;
  removeItem(cartId: string, productId: string): Promise<boolean>;
  clearCart(cartId: string): Promise<boolean>;
}
