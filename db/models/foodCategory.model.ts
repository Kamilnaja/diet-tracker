import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const FoodCategory = sequelize.define("FoodCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});
