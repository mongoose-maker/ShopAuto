import { Address } from "../../../../core/models/Address/Address.js";
import sequelize from "../../db.js";
import { DataTypes, Model, Optional } from "sequelize";
class SeqUser extends Model {
    id;
    name;
    email;
    password;
}
SeqUser.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // unique ???
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.JSON,
        allowNull: true,
        unique: true,
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