//Récupération ressources JSON grace au fetch
async function getRecipes() { 
  const response = await fetch("data/recipes.json");
  const recipes = await response.json();
  console.log(recipes);
  return recipes;
}
getRecipes();
