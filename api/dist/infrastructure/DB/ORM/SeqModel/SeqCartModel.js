import sequelize from '../../db.js';
import { DataTypes, Model } from 'sequelize';
class SeqCart extends Model {
}
SeqCart.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'carts',
    timestamps: true,
});
export default SeqCart;
//# sourceMappingURL=SeqCartModel.js.map