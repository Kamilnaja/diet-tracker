import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Food = sequelize.define("Food", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  caloriesPer100gram: {
    type: DataTypes.FLOAT,
  },
  caloriesPerPiece: {
    type: DataTypes.FLOAT,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  description: {
    type: DataTypes.STRING,
  },
});
