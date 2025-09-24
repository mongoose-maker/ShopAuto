import { Cart } from "../../models/Cart/Cart";
import { AddCartDto } from "./dto/addCartDto";
import { ReadCartDto } from "./dto/readCartDto";
import { UpdateCartDto } from "./dto/updateCartDto";
export interface CartRepository {
    addCart(dto: AddCartDto): Cart;
    addItemToCart(dto: AddCartDto): Cart;
    getItemList(dto: ReadCartDto): Cart;
    updateQuantityItem(dto: UpdateCartDto): Cart;
    removeItem(dto: UpdateCartDto): Cart;
    deleteCart(id: string): Cart;
}
//# sourceMappingURL=CartRepositiry.d.ts.map