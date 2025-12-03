import sequelize from "../../db.js";
import { Model, DataTypes } from "sequelize";
import SeqOrder from "./SeqOrderModel.js";
import SeqProduct from "./SeqProductModel.js";
class SeqOrderItem extends Model {
}
SeqOrderItem.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "orders",
            key: "id",
        },
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01,
        },
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01,
        },
    },
}, {
    sequelize,
    tableName: "orderItems",
    timestamps: true,
    indexes: [
        {
            fields: ["orderId"],
        },
        {
            fields: ["productId"],
        },
    ],
});
export default SeqOrderItem;
//# sourceMappingURL=SeqOrderItemModel.js.map