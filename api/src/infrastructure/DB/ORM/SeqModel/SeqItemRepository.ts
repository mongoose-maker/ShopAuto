import sequelize from "../../db.js";
import { DataTypes, Model } from "sequelize";
import SeqProduct from "./SeqProductModel.js";
import SeqCart from "./SeqCartModel.js";

export interface SeqItemAttributes {
  id: undefined | number;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
}

class SeqItem extends Model implements SeqItemAttributes {
  public id!: undefined | number;
  public cartId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
}

SeqItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "items",
    timestamps: true,
  }
);

SeqItem.belongsTo(SeqCart, { foreignKey: "cartId", as: "cart" });
SeqItem.belongsTo(SeqProduct, { foreignKey: "productId", as: "product" });
export default SeqItem;
