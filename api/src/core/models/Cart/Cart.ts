import { CartItem } from './CartItem.js';

export class Cart {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly items: CartItem[] = [],
  ) {}
}
