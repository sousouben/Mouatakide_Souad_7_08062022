/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**************DOM****************/
//zones de recherches
const tags = document.querySelector(".selectedTag");

//INPUTS
const barreSearch = document.querySelector("#recherche")
const ingredientsFilter = document.querySelector("#ingredients-filter"); 
const appliancesFilter = document.querySelector("#appliances-filter");
const ustensilsFilter = document.querySelector("#ustensils-filter");

//CHEVRONS
const ingredientsChevron = document.querySelector(".ingredientsChevron");
const appliancesChevron = document.querySelector(".appliancesChevron");
const ustensilsChevron = document.querySelector(".ustensilsChevron");

//UL
const allListIngredients = document.querySelector("#ingredientsList");
const allListAppliances = document.querySelector("#appliancesList");
const allListUstensils = document.querySelector("#ustensilsList");

//cartes de recettes
const recipesContainer = document.querySelector("#output");

//ARRAY[]
let recipesArray = [];//toutes les recettes
let ingredientsArray = [];//tous les ingredients
let appliancesArray = [];//tous les appareils
let ustensilsArray = [];//tous les ustensiles
let selectedTags = []; //tableau de tags selectionnés
let selectedIngredients = []; //tableau des ingredients selectionnés
let selectedAppliances = []; // tableau des appareils selectionnés
let selectedUstensils = []; // tableau des ustensils selectionnés

//ECOUTEUR D'EVENEMENT avec addEventListener(click)
ingredientsFilter.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log("test");
  displayList(allListIngredients, ingredientsFilter, ingredientsChevron);
  masqueList(allListAppliances, appliancesFilter, appliancesChevron);
  masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
});

appliancesFilter.addEventListener("click", (e) => {
  e.preventDefault();
  displayList(allListAppliances, appliancesFilter, appliancesChevron);
  masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
  masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
});

ustensilsFilter.addEventListener("click", (e) => {
  e.preventDefault();
  displayList(allListUstensils, ustensilsFilter, ustensilsChevron);
  masqueList(allListAppliances, appliancesFilter, appliancesChevron);
  masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);

});

//Lorsque l'utilisateur clique sur le champ de saisie, la liste des options apparaît et le chevron tourne

function displayList(listgroup, input, chevron){
  listgroup.style.display = "block";
  input.style.width = "667px";
  input.style.height = "397px"
  chevron.style.transform = "rotate(180deg)";
}

//Lorsque l'utilisateur clique sur un champ de saisie, la liste des options apparaît, et lorsque l'utilisateur clique sur un autre champ de saisie, la liste des options disparaît.

function masqueList(listGroup, input, chevron){
  listGroup.style.display = "none";
  input.style.width = "207px";
  chevron.style.transform = "none";
  input.value = "";
}

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

