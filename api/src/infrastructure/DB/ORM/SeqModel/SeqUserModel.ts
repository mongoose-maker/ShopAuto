import sequelize from "../../db.js";
import { DataTypes, Model } from "sequelize";

export interface SeqUserAttributes {
  id: number | undefined; // | string
  name: string;
  email: string;
  password: string;
}

class SeqUser extends Model<SeqUserAttributes> implements SeqUserAttributes {
  public id!: number | undefined; // string
  public name!: string;
  public email!: string;
  public password!: string;
}

SeqUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
