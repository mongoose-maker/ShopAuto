import { Model, type Optional } from 'sequelize';
import SeqUser from './SeqUserModel.js';
import SeqCart from './SeqCartModel.js';
import SeqItem from './SeqItemRepository.js';
import SeqAddress from './SeqAddressModel.js';
import { ORDER_STATUSES } from '../../../../core/models/Order/Order.js';
export interface SeqOrderAttributes {
    id: string;
    userId: string;
    status: (typeof ORDER_STATUSES)[number];
    totalAmount: number;
    shippingAddressId?: string | null;
    cartId?: string | null;
}
type SeqOrderCreationAttributes = Optional<SeqOrderAttributes, 'id' | 'shippingAddressId' | 'cartId'>;
declare class SeqOrder extends Model<SeqOrderAttributes, SeqOrderCreationAttributes> implements SeqOrderAttributes {
    id: string;
    userId: string;
    status: (typeof ORDER_STATUSES)[number];
    totalAmount: number;
    shippingAddressId?: string | null;
    cartId?: string | null;
    readonly user?: InstanceType<typeof SeqUser>;
    readonly cart?: InstanceType<typeof SeqCart>;
    readonly address?: InstanceType<typeof SeqAddress>;
    readonly cartItems?: InstanceType<typeof SeqItem>[];
}
export default SeqOrder;
//# sourceMappingURL=SeqOrderModel.d.ts.map