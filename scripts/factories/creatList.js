/* eslint-disable no-unused-vars */
class CreatListIngredients {
  constructor(ingredient) {
    this.ingredient = ingredient;
  }

  buildListIngredients() {
    const allListIngredients = document.createElement("li");
    allListIngredients.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "ingredient-item"
    );
    allListIngredients.setAttribute("data-color", "bg-primary");
    allListIngredients.setAttribute("data-item", this.ingredient);
    allListIngredients.setAttribute("data-type", "ingredient");
    allListIngredients.innerHTML = this.ingredient;

    return allListIngredients;
  }
} //console.log(CreatListIngredients);

class CreatListAppliances {
  constructor(appliance) {
    this.appliance = appliance;
  }

  buildListAppliance() {
    const allListAppliances = document.createElement("li");
    allListAppliances.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "appliance-item"
    );
    allListAppliances.setAttribute("data-color", "bg-success");
    allListAppliances.setAttribute("data-item", this.appliance);
    allListAppliances.setAttribute("data-type", "appliance");
    allListAppliances.innerHTML = this.appliance;

    return allListAppliances;
  }
} //console.log(CreatListAppliances);

class CreatListUstensils {
  constructor(ustensil) {
    this.ustensil = ustensil;
  }

  buildListUstensil() {
    const allListUstensils = document.createElement("li");
    allListUstensils.classList.add(
      "list-items",
      "col-4",
      "col-sm-6",
      "col-md-4",
      "ustensil-item"
    );
    allListUstensils.setAttribute("data-color", "bg-danger");
    allListUstensils.setAttribute("data-item", this.ustensil);
    allListUstensils.setAttribute("data-type", "ustensil");
    allListUstensils.innerHTML = this.ustensil;

    return allListUstensils;
  }
} //console.log(CreatListUstensils);
