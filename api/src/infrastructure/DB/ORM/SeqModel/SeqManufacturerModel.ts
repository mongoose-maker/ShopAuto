import sequelize from "../../db.js";
import {
  DataTypes,
  Model,
  type HasManyAddAssociationMixin,
  type HasManyGetAssociationsMixin,
  type HasManySetAssociationsMixin,
} from "sequelize";
import SeqProduct from "./SeqProductModel.js";

export interface SeqManufacturerAttributes {
  id: undefined | string;
  name: string;
  descriptionManufacturer: string;
}

class SeqManufacturer
  extends Model<SeqManufacturerAttributes>
  implements SeqManufacturerAttributes
{
  public id!: undefined | string;
  public name!: string;
  public descriptionManufacturer!: string;

  public getProducts!: HasManyGetAssociationsMixin<SeqProduct>;
  public setProducts!: HasManySetAssociationsMixin<SeqProduct, number>;
  public addProduct!: HasManyAddAssociationMixin<SeqProduct, number>;
}

SeqManufacturer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descriptionManufacturer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "manufacturers",
    timestamps: true,
  }
);

export default SeqManufacturer;
