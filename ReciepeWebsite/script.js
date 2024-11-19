const recipes = {
  recipe1: {
    title: "Roasted Cauliflower Steaks With Chimichurri",
    image: "images/Roasted-Cauliflower-Steaks.webp",
    ingredients: [
      "1 large head cauliflower, sliced into steaks",
      "2 tbsp olive oil",
      "Salt and pepper",
      "Chimichurri sauce",
    ],
    directions:
      "Preheat the oven to 400°F. Brush cauliflower steaks with olive oil, season with salt and pepper, and roast for 25 minutes. Drizzle with chimichurri sauce before serving.",
  },
  recipe2: {
    title: "Harvest Salmon Bowls",
    image: "images/Harvest-Salmon-Bowls.webp",
    ingredients: [
      "2 salmon fillets",
      "1 cup quinoa",
      "1/2 cup roasted vegetables",
      "1/4 cup cranberries",
      "2 tbsp pumpkin seeds",
    ],
    directions:
      "Cook quinoa according to package instructions. Roast vegetables in the oven. Pan-sear the salmon and assemble the bowl with quinoa, roasted vegetables, cranberries, and pumpkin seeds.",
  },
  recipe3: {
    title: "Ramen Grilled Cheese",
    image: "images/Ramen-Grilled-Cheese.webp",
    ingredients: [
      "2 packets of instant ramen",
      "4 slices of bread",
      "Butter",
      "Cheddar cheese slices",
      "Green onions for garnish",
    ],
    directions:
      "Cook the ramen noodles according to package instructions, drain well. Butter one side of each bread slice, place cheese slices and ramen between two slices. Cook on a skillet until golden brown on both sides. Garnish with green onions.",
  },
  recipe4: {
    title: "Pomegranate Mocktail",
    image: "images/Pomegranate-Mocktail.webp",
    ingredients: [
      "1 cup pomegranate juice",
      "1/2 cup club soda",
      "Fresh mint leaves",
      "Ice cubes",
      "Pomegranate seeds for garnish",
    ],
    directions:
      "In a glass, combine pomegranate juice and club soda. Add mint leaves, ice cubes, and stir. Garnish with pomegranate seeds and serve chilled.",
  },
  recipe5: {
    title: "Classic Tomato Soup",
    image: "images/tomato.png",
    ingredients: [
      "6 large ripe tomatoes",
      "2 cloves garlic, minced",
      "1 onion, chopped",
      "2 tbsp olive oil",
      "4 cups vegetable broth",
      "Salt and pepper",
    ],
    directions:
      "Heat olive oil in a pot, sauté onions and garlic until soft. Add chopped tomatoes and cook until they break down. Pour in vegetable broth and simmer for 20 minutes. Blend the mixture and season with salt and pepper.",
  },
  recipe6: {
    title: "Chocolate Lava Cake",
    image: "images/chocolava.png",
    ingredients: [
      "200g dark chocolate",
      "100g butter",
      "2 eggs",
      "2 egg yolks",
      "50g sugar",
      "50g flour",
    ],
    directions:
      "Preheat oven to 450°F. Melt chocolate and butter together. Whisk eggs, yolks, and sugar until fluffy. Gently fold in chocolate mixture and flour. Pour into greased ramekins and bake for 10-12 minutes. Serve immediately.",
  },
  recipe7: {
    title: "Greek Salad",
    image: "images/salad.png",
    ingredients: [
      "2 large cucumbers, chopped",
      "1/2 cup Kalamata olives",
      "1/2 cup feta cheese, crumbled",
      "1 red onion, sliced",
      "3 tbsp olive oil",
      "2 tbsp red wine vinegar",
    ],
    directions:
      "In a large bowl, combine cucumbers, olives, feta cheese, and onions. Drizzle with olive oil and red wine vinegar, season with salt and pepper, and toss to combine.",
  },
  recipe8: {
    title: "Grilled Cheese Sandwich",
    image: "images/sandwich.png",
    ingredients: [
      "4 slices of bread",
      "Butter",
      "Cheddar cheese slices",
      "Mustard (optional)",
    ],
    directions:
      "Butter one side of each slice of bread. Place cheese slices between two pieces of bread (butter side out). Cook in a skillet over medium heat until golden brown and the cheese is melted. Serve with mustard if desired.",
  },
  recipe9: {
    title: "Spaghetti Carbonara",
    image: "images/r9.png",
    ingredients: [
      "400g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g grated Parmesan cheese",
      "Freshly ground black pepper",
    ],
    directions:
      "Cook spaghetti in boiling salted water. Meanwhile, fry pancetta until crisp. Beat eggs in a bowl, add Parmesan and pepper. Drain spaghetti and toss with pancetta, then quickly mix with egg mixture off the heat. Serve immediately.",
  },
};

// Function to load recipe details dynamically
function loadRecipe(recipeId) {
  const recipe = recipes[recipeId];

  if (recipe) {
    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById("recipe-image").src = recipe.image;
    document.getElementById("recipe-image").alt = recipe.title;

    // Load ingredients
    const ingredientsList = document.getElementById("ingredients-list");
    ingredientsList.innerHTML = ""; // Clear previous ingredients
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });

    // Load directions
    document.getElementById("directions-text").textContent = recipe.directions;
  }
}

// On page load, get the recipeId from the URL and load the appropriate recipe
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("recipe");
loadRecipe(recipeId);
