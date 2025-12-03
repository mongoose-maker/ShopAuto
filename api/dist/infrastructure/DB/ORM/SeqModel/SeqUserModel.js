import sequelize from "../../db.js";
import { DataTypes, Model } from "sequelize";
class SeqUser extends Model {
}
SeqUser.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING, // char ?
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "users",
    timestamps: true,
    paranoid: true,
});
export default SeqUser;
//# sourceMappingURL=SeqUserModel.js.map