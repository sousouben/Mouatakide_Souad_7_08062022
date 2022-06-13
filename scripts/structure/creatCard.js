/* eslint-disable no-unused-vars */
class RecipesCard{
    constructor(recipe){
        this.id = recipe.id;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.ingredients = recipe.ingredients;        
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance.toLowerCase();//La méthode toLowerCase() retourne la chaîne de caractères courante en minuscules.
                  
    }

}