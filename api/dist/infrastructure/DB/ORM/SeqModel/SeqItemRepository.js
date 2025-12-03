import sequelize from "../../db.js";
import { DataTypes, Model } from "sequelize";
class SeqItem extends Model {
}
SeqItem.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    cartId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "items",
    timestamps: true,
});
export default SeqItem;
//# sourceMappingURL=SeqItemRepository.js.map