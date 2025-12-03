import { Cart } from "../../../core/models/Cart/Cart.js";
import type { SeqCartAttributes } from "../ORM/SeqModel/SeqCartModel.js";
import type { SeqItemAttributes } from "../ORM/SeqModel/SeqItemRepository.js";
import type { SeqProductWithRelations } from "./MapperProduct.js";
export type SeqCartWithRelations = SeqCartAttributes & {
    items?: (SeqItemAttributes & {
        product?: SeqProductWithRelations;
    })[];
};
export declare class CartMapper {
    static toDomain(raw: SeqCartWithRelations): Cart;
    static toPersistence(cart: Cart): Omit<SeqCartAttributes, "id">;
}
//# sourceMappingURL=MapperCart.d.ts.map