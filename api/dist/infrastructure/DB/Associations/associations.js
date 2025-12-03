import SeqCategory from '../ORM/SeqModel/SeqCategoryModel.js';
import SeqManufacturer from '../ORM/SeqModel/SeqManufacturerModel.js';
import SeqProduct from '../ORM/SeqModel/SeqProductModel.js';
import SeqOrder from '../ORM/SeqModel/SeqOrderModel.js';
import SeqUser from '../ORM/SeqModel/SeqUserModel.js';
import SeqAddress from '../ORM/SeqModel/SeqAddressModel.js';
import SeqCart from '../ORM/SeqModel/SeqCartModel.js';
import SeqItem from '../ORM/SeqModel/SeqItemRepository.js';
import SeqOrderItem from '../ORM/SeqModel/SeqOrderItemModel.js';
SeqManufacturer.hasMany(SeqProduct, {
    as: 'products',
    foreignKey: 'manufacturerId',
});
SeqCategory.hasMany(SeqProduct, {
    as: 'products',
    foreignKey: 'categoryId',
});
SeqProduct.belongsTo(SeqCategory, {
    as: 'category',
    foreignKey: 'categoryId',
});
SeqProduct.belongsTo(SeqManufacturer, {
    as: 'manufacturer',
    foreignKey: 'manufacturerId',
});
SeqOrder.belongsTo(SeqUser, { foreignKey: 'userId', as: 'user' });
SeqOrder.belongsTo(SeqAddress, { foreignKey: 'addressId', as: 'address' });
SeqOrder.belongsTo(SeqCart, { foreignKey: 'cartId', as: 'cart' });
SeqOrder.hasMany(SeqItem, {
    foreignKey: 'cartId',
    sourceKey: 'cartId',
    as: 'cartItems',
    constraints: false,
});
SeqOrder.hasMany(SeqOrderItem, {
    foreignKey: 'orderId',
    as: 'orderItems',
});
SeqOrderItem.belongsTo(SeqOrder, {
    foreignKey: 'orderId',
    as: 'orders',
});
SeqOrderItem.belongsTo(SeqProduct, {
    foreignKey: 'productId',
    as: 'product',
});
SeqItem.belongsTo(SeqCart, { foreignKey: 'cartId', as: 'cart' });
SeqItem.belongsTo(SeqProduct, { foreignKey: 'productId', as: 'product' });
SeqCart.belongsTo(SeqUser, { foreignKey: 'userId', as: 'user' });
SeqCart.hasMany(SeqItem, { foreignKey: 'cartId', as: 'items' });
export { SeqManufacturer, SeqProduct, SeqCategory, SeqOrder, SeqOrderItem, SeqCart, SeqItem, SeqUser, SeqAddress, };
//# sourceMappingURL=associations.js.map