import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

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
