import { CartItem } from "../CartItem/CartItem.js";

export class Cart {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly item: CartItem[] = [] // ?
  ) {}
}
