import { Cart } from "../../../core/models/Cart/Cart.js";
import type { SeqCartAttributes } from "../ORM/SeqModel/SeqCartModel.js";
import type { SeqItemAttributes } from "../ORM/SeqModel/SeqItemRepository.js";
import type { SeqProductWithRelations } from "./MapperProduct.js";
import { ItemMapper } from "./MapperItem.js";

export type SeqCartWithRelations = SeqCartAttributes & {
  items?: (SeqItemAttributes & { product?: SeqProductWithRelations })[];
};

export class CartMapper {
  static toDomain(raw: SeqCartWithRelations): Cart {
    const items = raw.items?.map((item) => ItemMapper.toDomain(item)) ?? [];

    return new Cart(raw.id, raw.userId, items);
  }

  static toPersistence(cart: Cart): Omit<SeqCartAttributes, "id"> {
    return {
      userId: cart.userId,
    };
  }
}
