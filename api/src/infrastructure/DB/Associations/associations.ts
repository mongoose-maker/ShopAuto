import SeqCategory from "../ORM/SeqModel/SeqCategoryModel.js";
import SeqManufacturer from "../ORM/SeqModel/SeqManufacturerModel.js";
import SeqProduct from "../ORM/SeqModel/SeqProductModel.js";

SeqManufacturer.hasMany(SeqProduct, {
  as: "products",
  foreignKey: "manufacturerId",
});

SeqProduct.belongsTo(SeqManufacturer, {
  as: "manufacturer",
  foreignKey: "manufacturerId",
});

SeqCategory.hasMany(SeqProduct, {
  as: "products",
  foreignKey: "categoryId",
});

SeqProduct.belongsTo(SeqCategory, {
  as: "category",
  foreignKey: "categoryId",
});

export { SeqManufacturer, SeqProduct, SeqCategory };
