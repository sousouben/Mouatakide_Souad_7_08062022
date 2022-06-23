/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**************DOM****************/

//zones de recherches
const tags = document.querySelector(".selectedTag");

//INPUTS
const barreSearch = document.querySelector("#recherche");
const ingredientsFilter = document.querySelector("#ingredients-filter");
const appliancesFilter = document.querySelector("#appliances-filter");
const ustensilsFilter = document.querySelector("#ustensils-filter");
const principalSearch = document.querySelector("#recherche");

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
let recipesArray = []; //toutes les recettes
let ingredientsArray = []; //tous les ingredients
let appliancesArray = []; //tous les appareils
let ustensilsArray = []; //tous les ustensiles
let selectedTags = []; //tableau de tags selectionnés
let selectedIngredients = []; //tableau des ingredients selectionnés
let selectedAppliances = []; // tableau des appareils selectionnés
let selectedUstensils = []; // tableau des ustensils selectionnés
let principalRecipeSearchValue = ""; // requête principe de recherche de recettes
let selectedRecipes = []; // tableau des recettes selectionnée par la recherche principale

let isIngredientFilterOpen = false;
let isAppliancesFilterOpen = false;
let isUstensilsFilterOpen = false;

//ECOUTEUR D'EVENEMENT avec addEventListener(click)
ingredientsFilter.addEventListener("click", (e) => {
  e.preventDefault();
  isIngredientFilterOpen = !isIngredientFilterOpen;
  if (isIngredientFilterOpen) {
    displayList(allListIngredients, ingredientsFilter, ingredientsChevron);
    masqueList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  } else {
    masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
    masqueList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  }
});

appliancesFilter.addEventListener("click", (e) => {
  e.preventDefault();
  isAppliancesFilterOpen = !isAppliancesFilterOpen;
  if (isAppliancesFilterOpen) {
    displayList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
    masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  } else {
    masqueList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
    masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
  }
});

ustensilsFilter.addEventListener("click", (e) => {
  e.preventDefault();
  isUstensilsFilterOpen = !isUstensilsFilterOpen;
  if (isUstensilsFilterOpen) {
    displayList(allListUstensils, ustensilsFilter, ustensilsChevron);
    masqueList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
  } else {
    masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
    masqueList(allListAppliances, appliancesFilter, appliancesChevron);
    masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
  }
});

//Lorsque l'utilisateur clique sur le champ de saisie, la liste des options apparaît et le chevron tourne

function displayList(listgroup, input, chevron) {
  listgroup.style.display = "block";
  listgroup.style.width = "667px";
  input.style.width = "667px";
  chevron.style.transform = "rotate(180deg)";
}

//Lorsque l'utilisateur clique sur un champ de saisie, la liste des options apparaît, et lorsque l'utilisateur clique sur un autre champ de saisie, la liste des options disparaît.

function masqueList(listGroup, input, chevron) {
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
  recipesArray = [...recipes];
  console.log(recipesArray.length); //permet de parcourir le tableau et de connaitre le nombre de recettes (50 recettes)

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

const creatAllLists = async () => {
  await getRecipes();

  recipesArray.forEach((recipe) => {
    recipe.ingredients.map((element) => {
      ingredientsArray.push(element.ingredient);
      //console.log(ingredientsArray);
    });
    appliancesArray.push(recipe.appliance);
    console.log(appliancesArray);
    recipe.ustensils.map((element) => {
      ustensilsArray.push(element);
      //console.log(ustensilsArray);
    });
  });

  ingredientsArray = [...new Set(ingredientsArray)].sort();
  appliancesArray = [...new Set(appliancesArray)].sort();
  ustensilsArray = [...new Set(ustensilsArray)].sort();

  //console.log(ingredientsArray);

  creatListIngredients(ingredientsArray);
  creatListAppliances(appliancesArray);
  creatListUstensils(ustensilsArray);
};
creatAllLists();

//Elle crée une liste d'ingrédients à partir d'un tableau d'ingrédients.
function creatListIngredients(ingredients) {
  allListIngredients.innerHTML = "";
  ingredients.forEach((ingredient) => {
    allListIngredients.appendChild(
      new CreatListIngredients(ingredient).buildListIngredients()
    );
  });
  ingredientsArray = Array.from(document.querySelectorAll(".ingredient-item"));
  ingredientsArray = [...new Set(ingredientsArray)].sort();
  //console.log(ingredientsArray);

  ingredientsArray.forEach((item) => {
    item.addEventListener("click", () => {
      if (!inSelectedTags(item.dataset.item)) {
        selectedIngredients.push(
          item.dataset.item.toLowerCase().replace(/\s/g, "")
        );
        selectedTags.push(item); // empeche l'affichage en double du tag
      }

      masqueList(allListIngredients, ingredientsFilter, ingredientsChevron);
      ingredientsFilter.value = "";
      init(recipesArray);
    });
  });
}

//Elle crée une liste d'appareils, et lorsque vous cliquez sur l'un d'eux, elle l'ajoute à un tableau d'appareils

function creatListAppliances(appliances) {
  allListAppliances.innerHTML = "";
  appliances.forEach((appliance) => {
    allListAppliances.appendChild(
      new CreatListAppliances(appliance).buildListAppliance()
    );
  });
  appliancesArray = Array.from(document.querySelectorAll(".appliance-item"));
  appliancesArray = [...new Set(appliancesArray)].sort();
  console.log(appliancesArray);

  appliancesArray.forEach((item) => {
    item.addEventListener("click", () => {
      if (!inSelectedTags(item.dataset.item)) {
        selectedAppliances.push(
          item.dataset.item.toLowerCase().replace(/\s/g, "")
        );
        selectedTags.push(item); // empeche l'affichage en double du tag
      }

      masqueList(allListAppliances, appliancesFilter, appliancesChevron);
      appliancesFilter.value = "";
      init(recipesArray);
    });
  });
}

//elle crée une liste d'ustensiles, et lorsque vous cliquez sur l'un d'eux, elle l'ajoute à un Tableau d'ustensiles.

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
      if (!inSelectedTags(item.dataset.item)) {
        selectedUstensils.push(
          item.dataset.item.toLowerCase().replace(/\s/g, "")
        );
        selectedTags.push(item); // empeche l'affichage en double du tag
      }
      masqueList(allListUstensils, ustensilsFilter, ustensilsChevron);
      ustensilsFilter.value = "";
      init(recipesArray);
    });
  });
}

//gestion des tags
//Vérifier si les balises sélectionnées contiennent le nom de l'élément
//Si l'item_name est dans le tableau selectedTags, renvoie vrai, sinon renvoie faux.
function inSelectedTags(item_name) {
  let result = false;
  selectedTags.forEach((item) => {
    result = result || item.dataset.item === item_name;
  });
  return result;
}

//Elle crée une nouvelle balise pour chaque élément du tableau selectedTags.
function createTag() {
  tags.innerHTML = "";
  selectedTags.forEach((tag) => {
    //console.log(selectedTags);

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
  <img id="close" src="assets/svg/close-croix.svg" alt="croix pour fermer le tag"
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
//Elle supprime la balise du DOM, puis supprime la balise de la liste des balises sélectionnées.

function closeTag(e) {
  let element = e.target;
  // suppression de l'element graphique
  element.parentNode.remove(element);

  let item_name_to_remove = element.parentElement.dataset.item; //nom de l'élément enlevé
  let item_type_to_remove = element.parentElement.dataset.type; //type de l'élément enlevé
  // console.log(item_name_to_remove);
  selectedTags = removeItemFromObjectList(selectedTags, item_name_to_remove);

  switch (item_type_to_remove) {
    case "ingredient":
      selectedIngredients = removeItemFromList(
        selectedIngredients,
        item_name_to_remove
      );

      break;
    case "appliance":
      selectedAppliances = removeItemFromList(
        selectedAppliances,
        item_name_to_remove
      );

      break;
    case "ustensil":
      selectedUstensils = removeItemFromList(
        selectedUstensils,
        item_name_to_remove
      );
      break;
    default:
      console.log(`type not found ${expr}.`);
  }

  init(recipesArray);
}

//supprimer item_name de la liste d'objets
//target_list - la liste des objets dont on souhaite supprimer l'élément et item_name - le nom de l'élément à supprimer
function removeItemFromObjectList(target_list, item_name) {
  let result = false;
  let item_to_remove = null;
  // On parcourt la liste des items de target_list (tags selectionnés)
  // Pour chaque item,"ici tag", si son nom = nom recherché, ici item_name
  // on l'enregistre dans item_to_remove et on sort de la boucle, break.
  // sinon on va voir l'item suivant
  for (let item of target_list) {
    result = item.innerHTML === item_name;
    if (result) {
      item_to_remove = item;
      break;
    }
  }
  //// si item_name a été trouvé, donc item_to_remove n'est pas null
  // on peut donc le supprimer de target list
  if (item_to_remove) {
    let index = target_list.indexOf(item_to_remove);
    if (index > -1) {
      target_list.splice(index, 1);
    }
  }
  return target_list;
}

//supprimer item_name de la liste
//Elle prend une liste et un nom d'élément, et renvoie la liste avec l'élément supprimé
//target_list - la liste dont on souhaite supprimer l'élément
//item_name - Le nom de l'élément qu'on souhaite supprimer de la liste.

function removeItemFromList(target_list, item_name) {
  let index = target_list.indexOf(item_name.toLowerCase().replace(/\s/g, ""));
  //console.log(index);
  if (index > -1) {
    target_list.splice(index, 1);
  }
  //console.log(target_list);
  return target_list;
}

//gestion des tris par tags
//Elle filtre les recettes en fonction des ingrédients choisis
//recipesToFilter - un tableau d'objets (recettes)

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
    //console.log(selectedRecipesByIngredients);
  });

  return selectedRecipesByIngredients;
}

//Elle filtre les recettes filtrées par ingrédients, selon les appareils choisis.

function filterRecipesByAppliances(recipesToFilter) {
  //Filtre les recettes filtrées par ingrédients, selon les appareils choisis

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

//Elle filtre les recettes par les ustensiles sélectionnés

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

//Elle prend un tableau d'objets, boucle sur chaque objet, puis boucle sur chaque objet tableau d'ingrédients, puis pousse chaque ingrédient dans un nouveau tableau, puis supprime les doublons, puis trie* le tableau, puis passe le tableau à une autre fonction.

function displayIngredientsList(listToFilter) {
  let newIngredientsArray = [];

  listToFilter.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      newIngredientsArray.push(ingredient.ingredient);
      newIngredientsArray = [...new Set(newIngredientsArray)].sort();
      //console.log(newIngredientsArray);
    });
  });
  creatListIngredients(newIngredientsArray);
}

//Il prend un tableau d'objets, boucle sur chaque objet et pousse la valeur de la clé "appliance" dans un nouveau tableau. Ensuite, il supprime les doublons et trie le tableau.

function displayAppliancesList(listToFilter) {
  let newAppliancesArray = [];

  listToFilter.forEach((recipe) => {
    newAppliancesArray.push(recipe.appliance);
    newAppliancesArray = [...new Set(newAppliancesArray)].sort();
  });
  creatListAppliances(newAppliancesArray);
}
//Il prend un tableau d'objets, boucle à travers chaque objet, puis boucle à travers le tableau de chaque objet ustensiles, puis pousse chaque ustensile vers un nouveau tableau, puis supprime les doublons, puis trie le tableau,puis passe le tableau à une autre fonction.

function displayUstensilsList(listToFilter) {
  let newUstensilsArray = [];

  listToFilter.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      newUstensilsArray.push(ustensil);
      newUstensilsArray = [...new Set(newUstensilsArray)].sort();
      //console.log(ustensilsList); //retourne le tableau des ustensils  suivant les recettes triées
    });
  });
  creatListUstensils(newUstensilsArray);
}

//filtres par input
ingredientsFilter.addEventListener("input", ingredientInputFilter);
appliancesFilter.addEventListener("input", applianceInputFilter);
ustensilsFilter.addEventListener("input", ustensilInputFilter);

//Si la valeur d'entrée n'est pas incluse dans l'élément de la liste, masque l'élément de la liste, sinon affiche l'élément de la liste

function ingredientInputFilter(e) {
  const inputValue = e.target.value.toLowerCase();
  // console.log(inputValue);
  const items = document.querySelectorAll(".list-items");
  //console.log(items);

  for (i = 0; i < items.length; i++) {
    if (!items[i].innerHTML.toLowerCase().includes(inputValue)) {
      items[i].style.display = "none";
    } else {
      items[i].style.display = "list-item";
    }
  }
}

//Si la valeur d'entrée n'est pas incluse dans l'élément de la liste, masque l'élément de la liste, sinon affiche l'élément de la liste
function applianceInputFilter(e) {
  const inputValue = e.target.value.toLowerCase();
  // console.log(inputValue);
  const items = document.querySelectorAll(".list-items");
  //console.log(items);
  for (i = 0; i < items.length; i++) {
    if (!items[i].innerHTML.toLowerCase().includes(inputValue)) {
      items[i].style.display = "none";
    } else {
      items[i].style.display = "list-item";
    }
  }
}

//Si la valeur d'entrée n'est pas incluse dans l'élément de la liste, masque l'élément de la liste, sinon affiche l'élément de la liste
function ustensilInputFilter(e) {
  const inputValue = e.target.value.toLowerCase();
  // console.log(inputValue);
  const items = document.querySelectorAll(".list-items");
  //console.log(items);
  for (i = 0; i < items.length; i++) {
    if (!items[i].innerHTML.toLowerCase().includes(inputValue)) {
      items[i].style.display = "none";
    } else {
      items[i].style.display = "list-item";
    }
  }
}

//recherche principale
principalSearch.addEventListener("input", principalFilter);

//Elle filtre un tableau d'objets en fonction de la valeur d'une entrée de recherche
//recipesToFilter - un tableau d'objets, chaque objet est une recette
function principalRecipesFilter(recipesToFilter) {
  let selectedRecipesBySearch = [];
  recipesToFilter.filter((recipe) => {
    if (
      recipe.name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(principalRecipeSearchValue) ||
      recipe.description
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(principalRecipeSearchValue) ||
      recipe.ingredients.find((elt) =>
        elt.ingredient
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(principalRecipeSearchValue)
      )
    ) {
      selectedRecipesBySearch.push(recipe);
      selectedRecipesBySearch = [...new Set(selectedRecipesBySearch)];
    }
  });

  return selectedRecipesBySearch; //return Un tableau d'objets.
}

//Elle filtre le recipesArray en fonction de la valeur du champ d'entrée
function principalFilter(e) {
  principalRecipeSearchValue = e.target.value.toLowerCase().replace(/\s/g, "");
  // console.log(principalRecipeSearchValue);

  if (principalRecipeSearchValue.length >= 3) {
    selectedRecipes = principalRecipesFilter(recipesArray);
    //si il n'y a aucune correspondance alors message d'erreur
    if (!selectedRecipes.length) {
      allListIngredients.innerHTML = "";
      allListAppliances.innerHTML = "";
      allListUstensils.innerHTML = "";
      recipesContainer.innerHTML =
        "<p id='error' class='text-danger text-center'> Veuillez entrer un nom de recette, un ingredient, un appareil ou un ustensile de cuisine</p>";
    } else init(selectedRecipes);
  } else {
    selectedRecipes = recipesArray;
    init(selectedRecipes);
  }
}

/*
Pour le test jsbench.me

boucle for dans branche algoFor

function principalRecipesFilter(recipesToFilter) {
  let selectedRecipesBySearch = [];

  for (let recipe of recipesToFilter) {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredientName = recipe.ingredients[i].ingredient
        .toLowerCase()
        .replace(/\s/g, "");
      //console.log(ingredientName);
      if (ingredientName.includes(principalRecipeSearchValue)) {
        selectedRecipesBySearch.push(recipe);
        selectedRecipesBySearch = [...new Set(selectedRecipesBySearch)];
      }
    }

    if (
      recipe.name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(principalRecipeSearchValue) ||
      recipe.description
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(principalRecipeSearchValue)
    ) {
      selectedRecipesBySearch.push(recipe);
      selectedRecipesBySearch = [...new Set(selectedRecipesBySearch)];
      console.log(selectedRecipesBySearch);
    }
  }

  return selectedRecipesBySearch;
}
*/
