import sequelize from '../../db.js';
import {
  DataTypes,
  Model,
  type HasManyAddAssociationMixin,
  type HasManyGetAssociationsMixin,
  type HasManySetAssociationsMixin,
} from 'sequelize';
import SeqProduct from './SeqProductModel.js';

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
  public readonly products?: InstanceType<typeof SeqProduct>;

  public getProducts!: HasManyGetAssociationsMixin<SeqProduct>;
  public setProducts!: HasManySetAssociationsMixin<SeqProduct, string>;
  public addProduct!: HasManyAddAssociationMixin<SeqProduct, string>;
}

SeqManufacturer.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    tableName: 'manufacturers',
    timestamps: true,
  },
);

export default SeqManufacturer;
