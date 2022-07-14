/* eslint-disable no-unused-vars */
class RecipesCard {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance.toLowerCase(); //La méthode toLowerCase() retourne la chaîne de caractères courante en minuscules.
  }

  buildCard() {
    const card = document.createElement("article");
    //console.log(card);
    let photo = "";
    photo = this.name.toLowerCase().replace(/\s/g, "");

    card.classList.add(
      "card",
      "col-lg-4",
      "col-md-6",
      "col-sm-12",
      "g-4",
      "border-0"
    );

    card.innerHTML = `          
            <img class="card-img-top"  src="assets/images/${photo}.jpg"
        }" alt="${this.name}" />`;

    let cardBody = document.createElement("div");
    cardBody.className = "card-body py-0";
    card.appendChild(cardBody);

    let recipeInfo = document.createElement("div");
    recipeInfo.className =
      "receipTitle d-flex flex-row mt-2 mb-2 gap-2 justify-content-between align-items-center";
    cardBody.appendChild(recipeInfo);

    let cardTitle = document.createElement("h2");
    cardTitle.className = "card-title col m-0";
    cardTitle.textContent = `${this.name}`;
    recipeInfo.appendChild(cardTitle);

    let timeIcon = document.createElement("div");
    timeIcon.className =
      "time col-4 d-flex flex-row align-items-center justify-content-end";
    recipeInfo.appendChild(timeIcon);

    let recipeIconAndTime = document.createElement("p");
    recipeIconAndTime.className = "m-0 minutes";
    timeIcon.appendChild(recipeIconAndTime);

    recipeIconAndTime.innerHTML = `<span class="me-2">
  <img  src="assets/svg/time.svg" alt="image d'une horloge pour le temps de préparation">
  </span>${this.time} min`;

    let recipeInfoSecond = document.createElement("div");
    recipeInfoSecond.className =
      "recipe d-flex flex-row justify-content-between gap-1";
    cardBody.appendChild(recipeInfoSecond);

    recipeInfoSecond.innerHTML = `<ul class="ingredient-container col-5 mt-2">${this.ingredients
      .map(
        (element) =>
          `
  <li>
      <strong>${element.ingredient} :</strong> ${
            "quantity" in element ? element.quantity : ""
          } ${"unit" in element ? element.unit : ""}
  `
      )
      .join("")}</li>
  </ul>`;

    let etape = document.createElement("p");
    etape.className = "card-text col-7 mt-2";
    etape.textContent = `${this.description}`;
    recipeInfoSecond.appendChild(etape);
    return card;
  }
} //console.log(RecipesCard);
