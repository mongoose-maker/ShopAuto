import { Cart } from "../../models/Cart/Cart.js";
import { AddCartDto } from "./dto/addCartDto.js";
import { ReadCartDto } from "./dto/readCartDto.js";
import { UpdateCartDto } from "./dto/updateCartDto.js";

export interface CartRepository {
  addCart(dto: AddCartDto): Cart;
  addItemToCart(dto: AddCartDto): Cart;
  getItemList(dto: ReadCartDto): Cart; // ?
  updateQuantityItem(dto: UpdateCartDto): Cart; // ?
  removeItem(dto: UpdateCartDto): Cart;
  deleteCart(id: string): Cart;
}
