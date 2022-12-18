import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/db.sqlite",
});

const Food = sequelize.define("Food", {
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

const FoodCategory = sequelize.define("FoodCategory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

export async function runSequelize() {
  try {
    await sequelize.authenticate();
    await syncModels();
  } catch (err) {
    console.log("unable to connect to the database:", err);
  }
}

export async function syncModels() {
  await Food.sync({
    force: true,
  });

  await FoodCategory.sync({
    force: true,
  });
}
