import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db.js';
import SeqUser from './SeqUserModel.js';
import SeqCart from './SeqCartModel.js';
import SeqItem from './SeqItemRepository.js';
import SeqAddress from './SeqAddressModel.js';
import { ORDER_STATUSES } from '../../../../core/models/Order/Order.js';
class SeqOrder extends Model {
}
SeqOrder.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...ORDER_STATUSES),
        allowNull: false,
        defaultValue: 'created',
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    shippingAddressId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    cartId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    indexes: [
        {
            fields: ['userId'],
        },
        {
            fields: ['status'],
        },
    ],
});
export default SeqOrder;
//# sourceMappingURL=SeqOrderModel.js.map