import sequelize from "../../db.js";
import { DataTypes, Model } from "sequelize";
import SeqManufacturer from "./SeqManufacturerModel.js";
import SeqCategory from "./SeqCategoryModel.js";

export interface SeqProductAttributes {
  id: undefined | string;
  idProduct: undefined | string;
  name: string;
  manufacturerId: undefined | string; // ManufacturerId
  categoryId: undefined | string;
  description: string;
  price: number;
  availability: boolean;
  reviews: string;
  rating: number;
}

class SeqProduct
  extends Model<SeqProductAttributes>
  implements SeqProductAttributes
{
  public id!: undefined | string;
  public idProduct!: undefined | string;
  public name!: string;
  public manufacturerId!: undefined | string;
  public categoryId!: undefined | string;
  public description!: string;
  public price!: number;
  public availability!: boolean;
  public reviews!: string;
  public rating!: number;
}

SeqProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    idProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    reviews: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true,
  }
);

SeqProduct.belongsTo(SeqManufacturer, {
  as: "manufacturers",
  foreignKey: "manufacturerId",
}); //?
SeqProduct.belongsTo(SeqCategory, {
  as: "categories",
  foreignKey: "categoryId",
});

export default SeqProduct;
