import type { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../prisma";
import { Food, FoodDb } from "../models/food.model";
import type { NutriScore } from "../models/nutri-score.model";

type FoodWithTags = Prisma.FoodGetPayload<{
  include: { tags: true };
}>;

const mapFoodToFoodDb = (food: FoodWithTags): FoodDb => ({
  id: food.id,
  name: food.name,
  weight: food.weight,
  caloriesPer100g: food.caloriesPer100g,
  nutriScore: food.nutriScore as NutriScore,
  photo: food.photo,
  tags: food.tags.map((t) => t.tag_id).join(","),
});

const buildPagination = (
  limit?: number,
  page?: number,
): { take?: number; skip?: number } => {
  const take = limit && limit > 0 ? limit : undefined;
  const skip = page && page > 0 && take ? (page - 1) * take : undefined;
  return { take, skip };
};

export class FoodPrismaService {
  getFoodByTagsAndName = async (
    tag?: number,
    name?: string,
    limit?: number,
    page?: number,
  ): Promise<FoodDb[]> => {
    const { take, skip } = buildPagination(limit, page);

    const where: Prisma.FoodWhereInput = {};
    if (name) {
      where.name = { contains: name };
    }
    if (tag) {
      where.tags = { some: { tag_id: tag } };
    }

    const foods = await prisma.food.findMany({
      where,
      take,
      skip,
      include: { tags: true },
      orderBy: { id: "asc" },
    });

    return foods.map(mapFoodToFoodDb);
  };

  /**
   * Retrieves all food items.
   * @returns A promise that resolves to an array of Food objects.
   */
  getAllFood = async (limit?: number, page?: number): Promise<FoodDb[]> => {
    const { take, skip } = buildPagination(limit, page);

    const foods = await prisma.food.findMany({
      take,
      skip,
      include: { tags: true },
      orderBy: { id: "asc" },
    });

    return foods.map(mapFoodToFoodDb);
  };

  /**
   * Retrieves all food items by name.
   * @param name - The name of the food items to retrieve.
   * @param page - The page number for pagination (optional).
   * @param limit - The maximum number of items per page (optional).
   * @returns A promise that resolves to an array of Food objects.
   */
  getAllFoodByName = async (
    name: string,
    limit?: number,
    page?: number,
  ): Promise<FoodDb[]> => {
    const { take, skip } = buildPagination(limit, page);

    const foods = await prisma.food.findMany({
      where: { name: { contains: name } },
      take,
      skip,
      include: { tags: true },
      orderBy: { id: "asc" },
    });

    return foods.map(mapFoodToFoodDb);
  };

  getFoodByTag = async (
    tag: number,
    limit?: number,
    page?: number,
  ): Promise<FoodDb[]> => {
    try {
      const { take, skip } = buildPagination(limit, page);

      const foods = await prisma.food.findMany({
        where: { tags: { some: { tag_id: tag } } },
        take,
        skip,
        include: { tags: true },
        orderBy: { id: "asc" },
      });

      return foods.map(mapFoodToFoodDb);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  getFoodById = async (id: string): Promise<FoodDb | undefined> => {
    const food = await prisma.food.findUnique({
      where: { id: Number(id) },
      include: { tags: true },
    });

    if (!food) {
      return undefined;
    }

    return mapFoodToFoodDb(food);
  };

  addNewFood = async (food: Food): Promise<void> => {
    const { name, weight, caloriesPer100g, nutriScore, photo } = food;

    await prisma.food.create({
      data: {
        name: name as string,
        weight: weight as number,
        caloriesPer100g: caloriesPer100g as number,
        nutriScore: nutriScore as NutriScore,
        photo: photo as string,
      },
    });
  };

  addTags = async (tags: number[]): Promise<void> => {
    if (!tags.length) {
      return;
    }

    const lastFoodItem = await prisma.food.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });

    if (!lastFoodItem) {
      return;
    }

    await prisma.foodTags.createMany({
      data: tags.map((tagId) => ({
        food_id: lastFoodItem.id,
        tag_id: tagId,
      })),
    });
  };

  editFood = async (id: string, foodData: Food): Promise<void> => {
    const {
      name,
      weight,
      caloriesPer100g,
      nutriScore,
      tags = [],
      photo,
    } = foodData;

    await prisma.food.update({
      where: { id: Number(id) },
      data: {
        name: name as string,
        weight: weight as number,
        caloriesPer100g: caloriesPer100g as number,
        nutriScore: nutriScore as NutriScore,
        photo: photo as string,
      },
    });

    // Delete existing tags for the given food_id
    await prisma.foodTags.deleteMany({
      where: { food_id: Number(id) },
    });

    // Insert new tags
    if (tags.length) {
      await prisma.foodTags.createMany({
        data: tags.map((tagId) => ({
          food_id: Number(id),
          tag_id: Number(tagId),
        })),
      });
    }
  };

  deleteFood = async (id: string): Promise<void> => {
    // Delete associated tags first due to foreign key constraint
    await prisma.foodTags.deleteMany({
      where: { food_id: Number(id) },
    });

    await prisma.food.delete({
      where: { id: Number(id) },
    });
  };
}
