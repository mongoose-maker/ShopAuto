import sequelize from "../../db.js";
import { DataTypes, Model } from "sequelize";
import SeqProduct from "./SeqProductModel.js";

export interface SeqCategoryAttributes {
  id: undefined | string;
  name: string;
}

class SeqCategory
  extends Model<SeqCategoryAttributes>
  implements SeqCategoryAttributes
{
  public id!: undefined | string;
  public name!: string;
}

SeqCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: true,
  }
);

SeqCategory.hasMany(SeqProduct, {
  as: "products",
  foreignKey: "categoryId",
});

export default SeqCategory;
