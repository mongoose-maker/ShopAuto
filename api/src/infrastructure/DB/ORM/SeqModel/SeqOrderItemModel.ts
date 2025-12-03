import sequelize from '../../db.js';
import { Model, DataTypes, type Optional } from 'sequelize';
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

interface OrderItemCreationAttributes extends Optional<
  SeqOrderItemAttributes,
  'id' | 'orderId' | 'productId'
> {}

class SeqOrderItem extends Model<SeqOrderItemAttributes, OrderItemCreationAttributes> {
  public id!: string | undefined;
  public orderId?: string;
  public productId?: string;
  public quantity!: number;
  public unitPrice!: number;
  public totalPrice!: number;
  public readonly order?: InstanceType<typeof SeqOrder>;
  public readonly product?: InstanceType<typeof SeqProduct>;
}

SeqOrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
  },
  {
    sequelize,
    tableName: 'orderItems',
    timestamps: true,
    indexes: [
      {
        fields: ['orderId'],
      },
      {
        fields: ['productId'],
      },
    ],
  },
);

export default SeqOrderItem;
