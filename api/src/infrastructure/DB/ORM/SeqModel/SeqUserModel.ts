import sequelize from '../../db.js';
import { DataTypes, Model } from 'sequelize';

export interface SeqUserAttributes {
  id: string | undefined;
  name: string;
  email: string;
  password: string;
}

class SeqUser extends Model<SeqUserAttributes> implements SeqUserAttributes {
  public id!: string | undefined;
  public name!: string;
  public email!: string;
  public password!: string;
}

SeqUser.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
  },
);

export default SeqUser;
