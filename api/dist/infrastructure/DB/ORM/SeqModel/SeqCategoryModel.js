import sequelize from '../../db.js';
import { DataTypes, Model, } from 'sequelize';
import SeqProduct from './SeqProductModel.js';
class SeqCategory extends Model {
}
SeqCategory.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'categories',
    timestamps: true,
});
export default SeqCategory;
//# sourceMappingURL=SeqCategoryModel.js.map