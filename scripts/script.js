/**************DOM****************/

//INPUTS
const barreSearch = document.querySelector("#recherche")
const ingredientsFilter = document.querySelector("#ingredients-filter"); 
const appliancesFilter = document.querySelector("#appliances-filter");
const ustensilsFilter = document.querySelector("#ustensils-filter");

//CHEVRONS
const ingredientsChevron = document.querySelector(".ingredientsChevron");
const appliancesChevron = document.querySelector(".appliancesChevron");
const ustensilsChevron = document.querySelector(".ustensilsChevron");

//ARRAY[]
let recipesArray = [];//toutes les recettes
let ingredientsArray = [];//tous les ingredients
let appliancesArray = [];//tous les appareils
let ustensilsArray = [];//tous les ustensiles

//ECOUTEUR D'EVENEMENT avec addEventListener(click)
ingredientsFilter.addEventListener("click", (e)=>{
  e.preventDefault();  
})



//Récupération ressources JSON grace au fetch
async function getRecipes() { 
  const res = await fetch("data/recipes.json");
  const { recipes } = await res.json();
  recipesArray = recipes;
  recipesArray = [
    ...recipes
  ]
  console.log(recipesArray.length);//permet de parcourir le tableau et de connaitre le nombre de recettes (50 recettes)
}
getRecipes();

