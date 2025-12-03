import { CartItem } from '../../../core/models/Cart/CartItem.js';
import type { SeqItemAttributes } from '../ORM/SeqModel/SeqItemRepository.js';
import { ProductMapper } from './MapperProduct.js';
import type { SeqProductWithRelations } from './MapperProduct.js';

type SeqItemWithRelations = SeqItemAttributes & {
  product?: SeqProductWithRelations;
};

export class ItemMapper {
  static toDomain(raw: SeqItemWithRelations): CartItem {
    const product = raw.product ? ProductMapper.toDomain(raw.product) : undefined;

    return new CartItem(raw.id?.toString(), raw.cartId, raw.productId, raw.quantity, product);
  }
  static toPersistence(item: CartItem): Omit<SeqItemAttributes, 'id'> {
    if (!item.product)
      throw new Error('Product association is required to persist cart item price');

    return {
      cartId: item.cartId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    };
  }
}
