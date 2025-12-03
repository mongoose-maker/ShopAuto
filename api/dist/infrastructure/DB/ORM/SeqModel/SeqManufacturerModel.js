import sequelize from '../../db.js';
import { DataTypes, Model, } from 'sequelize';
import SeqProduct from './SeqProductModel.js';
class SeqManufacturer extends Model {
}
SeqManufacturer.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descriptionManufacturer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'manufacturers',
    timestamps: true,
});
export default SeqManufacturer;
//# sourceMappingURL=SeqManufacturerModel.js.map