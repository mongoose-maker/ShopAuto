import sequelize from "../../db.js";
import { DataTypes, Model, type Optional } from "sequelize";
import SeqManufacturer from "./SeqManufacturerModel.js";
import SeqCategory from "./SeqCategoryModel.js";

export interface SeqProductAttributes {
  id?: number; // ✅ AUTOINCREMENT = number
  idProduct: string; // ✅ Артикул - строка
  name: string;
  manufacturerId?: string; // ✅ Опционально
  categoryId?: string; // ✅ Опционально
  description: string;
  price: number;
  availability: boolean;
  rating: number;
}

// ✅ Убрал reviews - это будет отдельная таблица
interface SeqProductCreationAttributes
  extends Optional<SeqProductAttributes, "id"> {}

class SeqProduct
  extends Model<SeqProductAttributes, SeqProductCreationAttributes>
  implements SeqProductAttributes
{
  public id!: number; // ✅
  public idProduct!: string; // ✅
  public name!: string;
  public manufacturerId!: string; // ✅
  public categoryId!: string; // ✅
  public description!: string;
  public price!: number;
  public availability!: boolean;
  public rating!: number;

  // ✅ Ассоциации (добавь!)
  public readonly manufacturer?: SeqManufacturer;
  public readonly category?: SeqCategory;
}

SeqProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idProduct: {
      type: DataTypes.STRING, // ✅ STRING для артикула
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturerId: {
      type: DataTypes.UUID, // ✅ UUID для связей
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID, // ✅ UUID для связей
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT, // ✅ TEXT для длинных описаний
      allowNull: false, // ✅ NOT NULL
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // ✅ DECIMAL для денег
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // ✅ Значение по умолчанию
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

// ✅ АССОЦИАЦИИ (ДОБАВЬ ЭТО!)
SeqProduct.belongsTo(SeqManufacturer, {
  foreignKey: "manufacturerId",
  as: "manufacturer",
});

SeqProduct.belongsTo(SeqCategory, {
  foreignKey: "categoryId",
  as: "category",
});

export default SeqProduct;

// import sequelize from "../../db.js";
// import { DataTypes, Model } from "sequelize";
// import SeqManufacturer from "./SeqManufacturerModel.js";
// import SeqCategory from "./SeqCategoryModel.js";

// export interface SeqProductAttributes {
//   id: undefined | string;
//   idProduct: undefined | string;
//   name: string;
//   manufacturerId: undefined | string; // ManufacturerId
//   categoryId: undefined | string;
//   description: string;
//   price: number;
//   availability: boolean;
//   reviews: string;
//   rating: number;
// }

// class SeqProduct
//   extends Model<SeqProductAttributes>
//   implements SeqProductAttributes
// {
//   public id!: undefined | string;
//   public idProduct!: undefined | string;
//   public name!: string;
//   public manufacturerId!: undefined | string;
//   public categoryId!: undefined | string;
//   public description!: string;
//   public price!: number;
//   public availability!: boolean;
//   public reviews!: string;
//   public rating!: number;
// }

// SeqProduct.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       unique: true,
//     },
//     idProduct: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     manufacturerId: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     categoryId: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     price: {
//       type: DataTypes.NUMBER,
//       allowNull: true,
//     },
//     availability: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//     },
//     reviews: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     rating: {
//       type: DataTypes.NUMBER,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     tableName: "products",
//     timestamps: true,
//   }
// );

// export default SeqProduct;
