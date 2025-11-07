import { Cart } from "../../models/Cart/Cart.js";

export interface CartRepository {
  getByUserId(userId: string): Promise<Cart | null>;
  addItem(userId: string, productId: string, quantity: number): Promise<Cart>;
  updateItem(userId: string, itemId: string, quantity: number): Promise<Cart>;
  removeItem(userId: string, itemId: string): Promise<Cart>;
  clear(userId: string): Promise<void>;
}
