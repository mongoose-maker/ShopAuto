import { Model, DataTypes, type Optional } from "sequelize";
import sequelize from "../../db.js";

export interface SeqAddressAttributes {
  id: string | undefined;
  userId: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  numberOfApartment: number;
  postcode: number;
}

interface SeqAddressCreationAttributes
  extends Optional<SeqAddressAttributes, "id"> {}

class SeqAddress
  extends Model<SeqAddressAttributes, SeqAddressCreationAttributes>
  implements SeqAddressAttributes
{
  public id!: string | undefined;
  public userId!: string;
  public country!: string;
  public city!: string;
  public street!: string;
  public houseNumber!: number;
  public numberOfApartment!: number;
  public postcode!: number;
}

SeqAddress.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", // ✅ Ссылка на таблицу users
        key: "id",
      },
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false, // ✅ NOT NULL
      validate: {
        len: [2, 50], // ✅ Валидация длины
      },
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    houseNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 9999,
      },
    },
    numberOfApartment: {
      type: DataTypes.INTEGER,
      allowNull: true, // ✅ Может быть null (для частных домов)
      validate: {
        min: 1,
        max: 9999,
      },
    },
    postcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2,
        max: 6,
      },
    },
  },
  {
    sequelize,
    tableName: "addresses",
    timestamps: true,
    indexes: [
      // ✅ Индекс для быстрого поиска адресов пользователя
      {
        fields: ["userId"],
      },
    ],
  }
);

export default SeqAddress;
