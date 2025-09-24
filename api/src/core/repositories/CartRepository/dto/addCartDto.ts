import { Cart } from "../../../models/Cart/Cart";
import { User } from "../../../models/User/User";

export class AddCartDto {
  constructor(
    readonly userId: User,
    readonly itemId: Cart // ?
  ) {}
}
