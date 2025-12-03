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
  id?: string | undefined;
  name: string;
}

class SeqCategory
  extends Model<SeqCategoryAttributes>
  implements SeqCategoryAttributes
{
  public id?: string | undefined;
  public name!: string;
  public readonly products?: InstanceType<typeof SeqProduct>;

  public getProducts!: HasManyGetAssociationsMixin<SeqProduct>;
  public setProducts!: HasManySetAssociationsMixin<SeqProduct, string>;
  public addProducts!: HasManyAddAssociationMixin<SeqProduct, string>;
}

SeqCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
