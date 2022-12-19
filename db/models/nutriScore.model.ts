import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Nutriscore = sequelize.define("Nutriscore", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.ENUM("A", "B", "C", "D", "E"),
  },
});
