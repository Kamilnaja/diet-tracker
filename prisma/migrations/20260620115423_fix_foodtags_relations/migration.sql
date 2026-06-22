-- CreateTable
CREATE TABLE "FoodTags" (
    "food_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "FoodTags_pkey" PRIMARY KEY ("food_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "FoodTags" ADD CONSTRAINT "FoodTags_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTags" ADD CONSTRAINT "FoodTags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
