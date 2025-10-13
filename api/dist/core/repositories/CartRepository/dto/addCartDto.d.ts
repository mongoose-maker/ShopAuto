import { Cart } from "../../../models/Cart/Cart";
import { User } from "../../../models/User/User";
export declare class AddCartDto {
    readonly userId: User;
    readonly itemId: Cart;
    constructor(userId: User, itemId: Cart);
}
//# sourceMappingURL=addCartDto.d.ts.map