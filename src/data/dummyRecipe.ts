import type { Recipe } from "@/components/RecipeCard";

export const dummyRecipe: Recipe = {
  title: "Mediterranean Quinoa Power Bowl",
  cookingTime: "25 min",
  tags: ["High Protein", "Vegetarian", "Mediterranean"],
  ingredients: [
    "1 cup quinoa",
    "1 can chickpeas, drained",
    "1 cup cherry tomatoes, halved",
    "1 cucumber, diced",
    "½ red onion, thinly sliced",
    "½ cup kalamata olives",
    "100g feta cheese, crumbled",
    "2 tbsp extra virgin olive oil",
    "1 lemon, juiced",
    "Fresh parsley & mint",
  ],
  steps: [
    "Cook quinoa according to package directions. Fluff with a fork and let cool slightly.",
    "Toss chickpeas with a drizzle of olive oil and roast at 200°C for 15 minutes until crispy.",
    "Combine cherry tomatoes, cucumber, red onion, and olives in a large bowl.",
    "Whisk together olive oil, lemon juice, salt, and pepper for the dressing.",
    "Assemble bowls: quinoa base, topped with veggies, crispy chickpeas, and crumbled feta.",
    "Drizzle with dressing and garnish with fresh herbs. Serve immediately.",
  ],
};
