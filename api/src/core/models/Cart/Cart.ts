import { CartItem } from "../CartItem/CartItem";

export class Cart {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly item: CartItem[] = [] // ?
  ) {}
}
