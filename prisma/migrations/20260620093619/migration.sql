-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "caloriesPer100g" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "nutriScore" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);
