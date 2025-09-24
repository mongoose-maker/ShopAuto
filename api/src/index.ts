import express from "express";
import dotenv from "dotenv";
import sequelize from "./infrastructure/DB/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

try {
  await sequelize.authenticate();
  if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
  }
  console.log("Соеденение с БД утсановлено");
} catch (err) {
  console.log("Соеденение с БД Не утсановлене ", err);
  process.exit(1);
}

app.get("/", (req, res) => {
  res.send("server work");
});

app.listen(PORT, () => {
  console.log(` Express-server listen port: ${PORT}`);
});
