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

let isIngredientFilterOpen = false;
let isAppliancesFilterOpen = false;
let isUstensilsFilterOpen = false;


//ECOUTEUR D'EVENEMENT avec addEventListener(click)
ingredientsFilter.addEventListener("click", (e) => {
  e.preventDefault();
  isIngredientFilterOpen = !isIngredientFilterOpen;
  if(isIngredientFilterOpen){
    displayList(allListIngredients, ingredientsFilter, ingredientsChevron);
    masqueList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  }else{
    masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
    masqueList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  }
  
});

appliancesFilter.addEventListener("click", (e) => {
  e.preventDefault();
  isAppliancesFilterOpen = !isAppliancesFilterOpen;
  if(isAppliancesFilterOpen){
    displayList(allListAppliances, appliancesFilter, appliancesChevron);
  masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
  masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  }else{
    masqueList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
    masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  }
  
});

ustensilsFilter.addEventListener("click", (e) => {
  e.preventDefault();
  isUstensilsFilterOpen = !isUstensilsFilterOpen;
  if(isUstensilsFilterOpen){
  displayList(allListUstensils, ustensilsFilter, ustensilsChevron);
  masqueList(allListAppliances, appliancesFilter, appliancesChevron);
  masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
  }else{
  masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  masqueList(allListAppliances, appliancesFilter, appliancesChevron);
  masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
  }
});


//Lorsque l'utilisateur clique sur le champ de saisie, la liste des options apparaît et le chevron tourne

function displayList(listgroup, input, chevron){
  listgroup.style.display = "block";
  listgroup.style.width = "667px";
  input.style.width = "667px";
  chevron.style.transform = "rotate(180deg)";
}

//Lorsque l'utilisateur clique sur un champ de saisie, la liste des options apparaît, et lorsque l'utilisateur clique sur un autre champ de saisie, la liste des options disparaît.

function masqueList(listGroup, input, chevron){
  listGroup.style.display = "none";
  input.style.width = "207px";
  chevron.style.transform = "none";
  input.value = "";
}

//Cette fonction filtre les recettes par ingrédients, appareils et ustensiles, puis crée une liste des recettes, une liste de tag, une liste d'ingrédients, une liste d'appareils et une liste d'ustensiles.
function init(recipes) {
  const recipesBySearch = principalRecipesFilter(recipes);
  const recipesByIngredients = filterRecipesByIngredients(recipesBySearch);
  const recipesByAppliances = filterRecipesByAppliances(recipesByIngredients);
  const recipesByUstensils = filterRecipesByUstensils(recipesByAppliances);

  createRecipesList(recipesByUstensils);
  createTag();
  displayIngredientsList(recipesByUstensils);
  displayAppliancesList(recipesByUstensils);
  displayUstensilsList(recipesByUstensils);
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

  createRecipesList(recipes);
}
getRecipes();

//fonction pour afficher les cartes de recettes 
function createRecipesList(recipes) {
  recipesContainer.innerHTML = "";
  recipes.map((recipe) => {
    recipesContainer.appendChild(new RecipesCard(recipe).buildCard());
  });
}

//Il prend les données du fichier JSON et crée trois tableaux : ingredientsArray, appliancesArray et ustensilesArray. Ensuite, il crée trois listes : ingredientsList, appliancesList et ustensilsList.

const creatAllLists = async() =>{
  await getRecipes();

  recipesArray.forEach((recipe)=>{
    recipe.ingredients.map((element)=>{
      ingredientsArray.push(element.ingredient);
      console.log(ingredientsArray);
    });
    appliancesArray.push(recipe.appliance);
    console.log(appliancesArray);
    recipe.ustensils.map((element) => {
      ustensilsArray.push(element);
      console.log(ustensilsArray);
    });
  });

  ingredientsArray = [...new Set(ingredientsArray)].sort();
  appliancesArray = [...new Set(appliancesArray)].sort();
  ustensilsArray = [...new Set(ustensilsArray)].sort();

  console.log(ingredientsArray);

  creatListIngredients(ingredientsArray);
  creatListAppliances(appliancesArray);
  creatListUstensils(ustensilsArray);

};
creatAllLists();

//Il crée une liste d'ingrédients à partir d'un tableau d'ingrédients.

function creatListIngredients(ingredients){
  allListIngredients.innerHTML="";
  ingredients.forEach((ingredient)=>{
    allListIngredients.appendChild(new CreatListIngredients(ingredient).buildListIngredients());
  });
  ingredientsArray =Array.from(document.querySelectorAll(".ingredient-item"));
  ingredientsArray = [...new Set(ingredientsArray)].sort();
  console.log(ingredientsArray);  

  ingredientsArray.forEach((item) => {
    item.addEventListener("click", () => {
      selectedIngredients.push(
        item.dataset.item.toLowerCase().replace(/\s/g, "")
      );
       console.log(selectedIngredients);
       if (!inSelectedTags(item.dataset.item)) selectedTags.push(item); // empeche l'affichage en double du tag
       console.log(selectedTags);
       masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
       ingredientsFilter.value = "";
 
       init(recipesArray);
     });
   });
}

function creatListAppliances(appliances){
  allListAppliances.innerHTML ="";
  appliances.forEach((appliance)=>{
    allListAppliances.appendChild(new CreatListAppliances(appliance).buildListAppliance());
  });
  appliancesArray =Array.from(document.querySelectorAll(".appliance-item"));
  appliancesArray = [...new Set(appliancesArray)].sort();
  console.log(appliancesArray);  

  appliancesArray.forEach((item) => {
    item.addEventListener("click", () => {
      selectedAppliances.push(
        item.dataset.item.toLowerCase().replace(/\s/g, "")
      );
       console.log(selectedAppliances);
       if (!inSelectedTags(item.dataset.item)) selectedTags.push(item); // empeche l'affichage en double du tag
       
       masqueList(allListAppliances, appliancesFilter, appliancesChevron);
       appliancesFilter.value = "";
 
       init(recipesArray);
     });
   });
}

function creatListUstensils(ustensils) {
  allListUstensils.innerHTML = "";
  ustensils.forEach((ustensil) => {
    allListUstensils.appendChild(
      new CreatListUstensils(ustensil).buildListUstensil()
    );
  });
  ustensilsArray = Array.from(document.querySelectorAll(".ustensil-item"));
  ustensilsArray = [...new Set(ustensilsArray)].sort();
  console.log(ustensilsArray);

  ustensilsArray.forEach((item) => {
    item.addEventListener("click", () => {
      selectedUstensils.push(
        item.dataset.item.toLowerCase().replace(/\s/g, "")
      );
       console.log(selectedUstensils);
       if (!inSelectedTags(item.dataset.item)) selectedTags.push(item); // empeche l'affichage en double du tag
       console.log(selectedTags);
       masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
       ustensilsFilter.value = "";
 
       init(recipesArray);
     });
   });
}

function inSelectedTags(item_name) {
  var result = false;
  selectedTags.forEach((item) => {
    result = result || item.dataset.item === item_name;
  });
  return result;
}

function createTag() {
  tags.innerHTML = "";
  selectedTags.forEach((tag) => {
    console.log(selectedTags);

    const tagLi = document.createElement("li");
    const tagColor = tag.dataset.color;
    const tagName = tag.dataset.item;
    const tagType = tag.dataset.type;

    tagLi.classList.add(
      `${tagColor}`,
      "newTag",
      "mb-1",
      "me-2",
      `bg-${tagColor}`,
      "px-3",
      "py-2",
      "pe-5",
      "d-flex",
      "flex-row",
      "align-items-center",
      "rounded"
    );

    tagLi.innerHTML = `${tagName}
  <img id="close" src="assets/close-croix.svg" alt="croix pour fermer le tag"
/>`;
    tagLi.setAttribute("data-item", tagName);
    tagLi.setAttribute("data-type", tagType);
    tags.appendChild(tagLi);
    //console.log(tagLi);
    let tagClose = document.querySelectorAll("#close");
    //console.log(tagClose);
    tagClose.forEach((tag) => tag.addEventListener("click", closeTag));

    return tagLi;
  });
}

function filterRecipesByIngredients(recipesToFilter) {
  //Filtre les recettes selon les ingrédients choisis
  let selectedRecipesByIngredients = recipesToFilter;

  selectedIngredients.forEach((item) => {
    selectedRecipesByIngredients = selectedRecipesByIngredients.filter(
      (recipe) =>
        recipe.ingredients.find((elt) =>
          // console.log(item, elt.ingredient);
          elt.ingredient.toLowerCase().replace(/\s/g, "").includes(item)
        )
    );
    console.log(selectedRecipesByIngredients);
  });

  return selectedRecipesByIngredients;
}

function filterRecipesByAppliances(recipesToFilter) {
  //Filtre les recettes filtrées par ingrédients, selon l’appareil choisi

  let selectedRecipesByAppliances = recipesToFilter;

  selectedAppliances.forEach((item) => {
    //console.log(item);
    selectedRecipesByAppliances = selectedRecipesByAppliances.filter(
      (recipe) =>
        recipe.appliance.toLowerCase().replace(/\s/g, "").includes(item)
      //console.log(recipe.appliance);
    );
  });
  return selectedRecipesByAppliances;
}

function filterRecipesByUstensils(recipesToFilter) {
  //Filtre les recettes filtrées par appareils, selon les ustensiles choisis
  let selectedRecipesByUstensils = recipesToFilter;

  selectedUstensils.forEach((item) => {
    selectedRecipesByUstensils = selectedRecipesByUstensils.filter((recipe) =>
      recipe.ustensils.find((elt) =>
        elt.toLowerCase().replace(/\s/g, "").includes(item)
      )
    );
  });
  return selectedRecipesByUstensils;
}
