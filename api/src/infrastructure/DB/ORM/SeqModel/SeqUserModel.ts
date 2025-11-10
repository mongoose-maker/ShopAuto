import sequelize from "../../db.js";
import { DataTypes, Model } from "sequelize";

export interface SeqUserAttributes {
  id: string | undefined; // | string
  name: string;
  email: string;
  password: string;
}

class SeqUser extends Model<SeqUserAttributes> implements SeqUserAttributes {
  public id!: string | undefined; // string
  public name!: string;
  public email!: string;
  public password!: string;
}

SeqUser.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true, // unique ???
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.JSON,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, // char ?
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);

export default SeqUser;
