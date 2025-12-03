import { Model, type Optional } from 'sequelize';
import SeqOrder from './SeqOrderModel.js';
import SeqProduct from './SeqProductModel.js';
export interface SeqOrderItemAttributes {
    id: string | undefined;
    orderId?: string;
    productId?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
interface OrderItemCreationAttributes extends Optional<SeqOrderItemAttributes, 'id' | 'orderId' | 'productId'> {
}
declare class SeqOrderItem extends Model<SeqOrderItemAttributes, OrderItemCreationAttributes> {
    id: string | undefined;
    orderId?: string;
    productId?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    readonly order?: InstanceType<typeof SeqOrder>;
    readonly product?: InstanceType<typeof SeqProduct>;
}
export default SeqOrderItem;
//# sourceMappingURL=SeqOrderItemModel.d.ts.map