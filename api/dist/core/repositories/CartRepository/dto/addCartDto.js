import { Cart } from "../../../models/Cart/Cart";
import { User } from "../../../models/User/User";
export class AddCartDto {
    userId;
    itemId;
    constructor(userId, itemId // ?
    ) {
        this.userId = userId;
        this.itemId = itemId;
    }
}
//# sourceMappingURL=addCartDto.js.map