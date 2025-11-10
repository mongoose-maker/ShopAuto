import sequelize from "../../db.js";
import {
  DataTypes,
  Model,
  type HasManyAddAssociationMixin,
  type HasManyGetAssociationsMixin,
  type HasManySetAssociationsMixin,
} from "sequelize";
import SeqProduct from "./SeqProductModel.js";

export interface SeqCategoryAttributes {
  id?: undefined | number;
  name: string;
}

class SeqCategory
  extends Model<SeqCategoryAttributes>
  implements SeqCategoryAttributes
{
  public id?: undefined | number;
  public name!: string;
  public readonly products?: InstanceType<typeof SeqProduct>;

  public getProducts!: HasManyGetAssociationsMixin<SeqProduct>;
  public setProducts!: HasManySetAssociationsMixin<SeqProduct, number>;
  public addProducts!: HasManyAddAssociationMixin<SeqProduct, number>;
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

export default SeqCategory;
