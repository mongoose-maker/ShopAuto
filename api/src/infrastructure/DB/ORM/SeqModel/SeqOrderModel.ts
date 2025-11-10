import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../../db.js";
import SeqUser from "./SeqUserModel.js";
import SeqCart from "./SeqCartModel.js";
import SeqItem from "./SeqItemRepository.js";
import SeqAddress from "./SeqAddressModel.js";
import { ORDER_STATUSES } from "../../../../core/models/Order/Order.js";


export interface SeqOrderAttributes {
  id: string;
  userId: string;
  status: (typeof ORDER_STATUSES)[number];
  totalAmount: number;
  shippingAddressId?: string | null;
  cartId?: string | null;
}

type SeqOrderCreationAttributes = Optional<
  SeqOrderAttributes,
  "id" | "shippingAddressId" | "cartId"
>;

class SeqOrder
  extends Model<SeqOrderAttributes, SeqOrderCreationAttributes>
  implements SeqOrderAttributes
{
  public id!: string;
  public userId!: string;
  public status!: (typeof ORDER_STATUSES)[number];
  public totalAmount!: number;
  public shippingAddressId?: string | null;
  public cartId?: string | null;

  public readonly user?: InstanceType<typeof SeqUser>;
  public readonly cart?: InstanceType<typeof SeqCart>;
  public readonly address?: InstanceType<typeof SeqAddress>;
  public readonly cartItems?: InstanceType<typeof SeqItem>[];
}

SeqOrder.init(
  {
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
      defaultValue: "created",
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
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
    indexes: [
      {
        fields: ["userId"],
      },
      {
        fields: ["status"],
      },
    ],
  }
);

export default SeqOrder;
