import { Cart } from "../../../models/Cart/Cart.js";
import { User } from "../../../models/User/User.js";

export class AddCartDto {
  constructor(
    readonly userId: User,
    readonly itemId: Cart // ?
  ) {}
}
