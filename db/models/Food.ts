import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

export const Food = sequelize.define("Food", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
});
