import "dotenv/config";
import { Sequelize } from "sequelize";
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env file");
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
});
export default sequelize;
//# sourceMappingURL=db.js.map