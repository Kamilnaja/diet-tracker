import { prisma } from "../src/prisma";

async function main(): Promise<void> {
  await prisma.food.deleteMany();
  await prisma.food.createMany({
    data: [
      {
        name: "Apple",
        weight: 100,
        caloriesPer100g: 52,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/440px-Red_Apple.jpg",
      },
      {
        name: "Banana",
        weight: 100,
        caloriesPer100g: 89,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg",
      },
      {
        name: "Orange",
        weight: 100,
        caloriesPer100g: 47,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/440px-Orange-Whole-%26-Split.jpg",
      },
      {
        name: "Sausage",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/RedDot_Bologna.jpg/440px-RedDot_Bologna.jpg",
      },
      {
        name: "Bread",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "E",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/White_Bread-1.jpg/440px-White_Bread-1.jpg",
      },
      {
        name: "Milk",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2_percent_milk_glass.jpg/440px-2_percent_milk_glass.jpg",
      },
      {
        name: "Cheese",
        weight: 100,
        caloriesPer100g: 400,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Swiss_cheese_cubes.jpg/440px-Swiss_cheese_cubes.jpg",
      },
      {
        name: "Eggs",
        weight: 100,
        caloriesPer100g: 155,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Brown_chicken_egg.jpg/440px-Brown_chicken_egg.jpg",
      },
      {
        name: "Chicken",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chicken_family.jpg/480px-Chicken_family.jpg",
      },
      {
        name: "Pork",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "E",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/NCI_clove_ham.jpg/440px-NCI_clove_ham.jpg",
      },
      {
        name: "Beef",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/2nd_June_2012_Lamb_Steak_1.jpg/440px-2nd_June_2012_Lamb_Steak_1.jpg",
      },
      {
        name: "Fish",
        weight: 100,
        caloriesPer100g: 400,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Red_Snapper_-_USDA.jpg/440px-Red_Snapper_-_USDA.jpg",
      },
      {
        name: "Rice",
        weight: 100,
        caloriesPer100g: 155,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Uncooked_rice.jpg/440px-Uncooked_rice.jpg",
      },
      {
        name: "Potatoes",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/440px-Patates.jpg",
      },
      {
        name: "Tomatoes",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/440px-Bright_red_tomato_and_cross_section02.jpg",
      },
      {
        name: "Onions",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Onion_growing_flower_bolts.jpg/440px-Onion_growing_flower_bolts.jpg",
      },
      {
        name: "Garlic",
        weight: 100,
        caloriesPer100g: 400,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Garlic_bulbs_and_individual_clove.jpg/440px-Garlic_bulbs_and_individual_clove.jpg",
      },
      {
        name: "Lettuce",
        weight: 100,
        caloriesPer100g: 155,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Lactuca_sativa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-109.jpg/440px-Lactuca_sativa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-109.jpg",
      },
      {
        name: "Cucumber",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cucumbers.jpg/440px-Cucumbers.jpg",
      },
      {
        name: "Carrots",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "E",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Carrots.jpg/440px-Carrots.jpg",
      },
      {
        name: "Broccoli",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Broccoli_and_cross_section_edit.jpg/440px-Broccoli_and_cross_section_edit.jpg",
      },
      {
        name: "Spinach",
        weight: 100,
        caloriesPer100g: 400,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Spinach-leaves.jpg/440px-Spinach-leaves.jpg",
      },
      {
        name: "Cabbage",
        weight: 100,
        caloriesPer100g: 155,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Brassica_oleracea_Capitata_Group_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-027.jpg/440px-Brassica_oleracea_Capitata_Group_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-027.jpg",
      },
      {
        name: "Peas",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Peas_in_pods_-_Studio.jpg/440px-Peas_in_pods_-_Studio.jpg",
      },
      {
        name: "Beans",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "E",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Phaseolus_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-263.jpg/440px-Phaseolus_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-263.jpg",
      },
      {
        name: "Pasta",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Spaghetti-precooked.jpg/440px-Spaghetti-precooked.jpg",
      },
      {
        name: "Noodles",
        weight: 100,
        caloriesPer100g: 400,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Uncooked_Ramen.jpg/440px-Uncooked_Ramen.jpg",
      },
      {
        name: "Pizza",
        weight: 100,
        caloriesPer100g: 155,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/440px-Eq_it-na_pizza-margherita_sep2005_sml.jpg",
      },
      {
        name: "Burger",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/440px-RedDot_Burger.jpg",
      },
      {
        name: "Fries",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "E",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fries_2.jpg/440px-Fries_2.jpg",
      },
      {
        name: "Ice Cream",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Ice_Cream_dessert_02.jpg/440px-Ice_Cream_dessert_02.jpg",
      },
      {
        name: "Chocolate",
        weight: 100,
        caloriesPer100g: 400,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chocolate_%28blue_background%29.jpg/440px-Chocolate_%28blue_background%29.jpg",
      },
      {
        name: "Candy",
        weight: 100,
        caloriesPer100g: 155,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Candy_in_Damascus.jpg/440px-Candy_in_Damascus.jpg",
      },
      {
        name: "Cake",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_cake.jpg/440px-Chocolate_cake.jpg",
      },
      {
        name: "Cookies",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "E",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2ChocolateChipCookies.jpg/440px-2ChocolateChipCookies.jpg",
      },
      {
        name: "Coffee",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/440px-A_small_cup_of_coffee.JPG",
      },
      {
        name: "Tea",
        weight: 100,
        caloriesPer100g: 400,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Tea_leaves_steeping_in_a_zhong_%28gaiwan%29.jpg/440px-Tea_leaves_steeping_in_a_zhong_%28gaiwan%29.jpg",
      },
      {
        name: "Juice",
        weight: 100,
        caloriesPer100g: 155,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Orange_juice_1_edit1.jpg/440px-Orange_juice_1_edit1.jpg",
      },
      {
        name: "Water",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Drinking_fountain%2C_Toronto.jpg/440px-Drinking_fountain%2C_Toronto.jpg",
      },
      {
        name: "Soda",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "E",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Two_glasses_of_Coca-Cola.JPG/440px-Two_glasses_of_Coca-Cola.JPG",
      },
      {
        name: "Beer",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/A_bottle_of_Beer.jpg/440px-A_bottle_of_Beer.jpg",
      },
      {
        name: "Wine",
        weight: 100,
        caloriesPer100g: 400,
        nutriScore: "B",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Red_Wine_Glass.jpg/440px-Red_Wine_Glass.jpg",
      },
      {
        name: "Vodka",
        weight: 100,
        caloriesPer100g: 155,
        nutriScore: "C",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Vodka.jpg/440px-Vodka.jpg",
      },
      {
        name: "Whiskey",
        weight: 100,
        caloriesPer100g: 300,
        nutriScore: "D",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Glenfiddich_Special_Old_Reserve.jpg/440px-Glenfiddich_Special_Old_Reserve.jpg",
      },
      {
        name: "Rum",
        weight: 100,
        caloriesPer100g: 250,
        nutriScore: "E",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Rum_bottles.jpg/440px-Rum_bottles.jpg",
      },
      {
        name: "Cigarettes",
        weight: 100,
        caloriesPer100g: 42,
        nutriScore: "A",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Cigarettes_IMG_0509.JPG/440px-Cigarettes_IMG_0509.JPG",
      },
    ],
  });
  await prisma.tag.deleteMany();
  await prisma.tag.createMany({
    data: [
      { name: "Fruit" },
      { name: "Vegetable" },
      { name: "Meat" },
      { name: "Bread" },
      { name: "Dairy" },
      { name: "Egg" },
      { name: "Gluten" },
      { name: "Soy" },
      { name: "Nuts" },
      { name: "Peanuts" },
      { name: "Lactose" },
      { name: "Sugar" },
      { name: "Salt" },
      { name: "Alcohol" },
      { name: "Tobacco" },
      { name: "Other" },
    ],
  });

  await prisma.foodTags.deleteMany();
  await prisma.foodTags.createMany({
    data: [
      { food_id: 1, tag_id: 1 },
      { food_id: 1, tag_id: 2 },
      { food_id: 2, tag_id: 1 },
      { food_id: 2, tag_id: 2 },
      { food_id: 3, tag_id: 1 },
      { food_id: 3, tag_id: 2 },
      { food_id: 4, tag_id: 3 },
      { food_id: 5, tag_id: 4 },
      { food_id: 6, tag_id: 5 },
      { food_id: 7, tag_id: 5 },
      { food_id: 8, tag_id: 3 },
      { food_id: 9, tag_id: 3 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
