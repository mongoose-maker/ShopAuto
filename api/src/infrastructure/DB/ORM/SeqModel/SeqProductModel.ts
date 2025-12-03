import sequelize from "../../db.js";
import { DataTypes, Model, type Optional } from "sequelize";
import SeqManufacturer from "./SeqManufacturerModel.js";
import SeqCategory from "./SeqCategoryModel.js";

export interface SeqProductAttributes {
  id?: string;
  idProduct: string;
  name: string;
  manufacturerId?: string;
  categoryId?: string;
  description: string;
  price: number;
  availability: boolean;
  rating: number;
}

interface SeqProductCreationAttributes
  extends Optional<SeqProductAttributes, "id"> {}

class SeqProduct
  extends Model<SeqProductAttributes, SeqProductCreationAttributes>
  implements SeqProductAttributes
{
  public id!: string;
  public idProduct!: string;
  public name!: string;
  public manufacturerId!: string;
  public categoryId!: string;
  public description!: string;
  public price!: number;
  public availability!: boolean;
  public rating!: number;

  public readonly manufacturer?: SeqManufacturer;
  public readonly category?: SeqCategory;
}

SeqProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    idProduct: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturerId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), //
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1), // ✅ DECIMAL(2,1) для рейтинга 0.0-5.0
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true,
  }
);

export default SeqProduct;
