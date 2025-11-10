import sequelize from "../../db.js";
import { DataTypes, Model, type Optional } from "sequelize";

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

export default SeqCart;
