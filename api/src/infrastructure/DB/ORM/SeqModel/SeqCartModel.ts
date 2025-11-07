import sequelize from "../../db.js";
import { DataTypes, Model, type Optional } from "sequelize";
import SeqItem from "./SeqItemRepository.js";
import SeqUser from "./SeqUserModel.js";

export interface SeqCartAttributes {
  id: string;
  userId: string;
}

type SeqCartCreationAttributes = Optional<SeqCartAttributes, "id">;

class SeqCart
  extends Model<SeqCartAttributes, SeqCartCreationAttributes>
  implements SeqCartAttributes
{
  public id!: string;
  public userId!: string;
}

SeqCart.init(
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
  },
  {
    sequelize,
    tableName: "carts",
    timestamps: true,
  }
);

// Associations
SeqCart.belongsTo(SeqUser, { foreignKey: "userId", as: "user" });
SeqCart.hasMany(SeqItem, { foreignKey: "cartId", as: "items" });

export default SeqCart;
