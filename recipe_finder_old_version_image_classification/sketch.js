// video capture object to be initialized
let capture;
// image classifier object to be initialized
let ingredientClassifier;
// text of ingredient to be initialized
let ingredientText;
// button for saving ingredient
let button;
// string ingredient name
let ingredientName= '';
// ingredients saved array
let ingredientsSaved = [];
// search button to search recipe
let search;
// recipe list object
let recipeList = {
  "X = zest.": "https://www.culinaryhill.com/how-to-zest-a-lemon/",
  "X = breadAndNutella.": "https://www.foodnetwork.com/recipes/nutella-and-toast-recipe-1913728",
  "X = avocadoToast.": "https://feelgoodfoodie.net/recipe/avocado-toast-with-egg-3-ways/",
  "X = quesadilla.": "https://www.simplyrecipes.com/recipes/quesadilla/",
  "X = eggAndCheeseToast.": "https://toasterovenlove.com/egg-and-cheese-toasts/",
  "X = eggInHole.": "https://www.allrecipes.com/recipe/187850/egg-in-a-hole/"
};
// link to recipe to be initialized
let recipeLink;
// div element to be initialized
let div;
// clear button to be intitialized
let clear;
// ingredient p array
let ingredientPArray = [];

// function for what happens once project is run
function setup() {
  noCanvas();
  
  // initializes video capture object
  capture = createCapture(VIDEO);

  // initializes image classifier object
  ingredientClassifier = ml5.imageClassifier('/ingredients_model/model.json', capture, modelLoaded)
  
  // shows loading if model isn't ready yet
  ingredientText = createP('loading...');

  // create a button div
  buttonDiv = createDiv();
  buttonDiv.addClass('button-div');
  
  // create a save button
  button = createButton('save');
  buttonDiv.child(button);
  button.mousePressed(displayIngredient);
  
  // search button
  search = createButton('search');
  buttonDiv.child(search);
  search.mousePressed(findRecipe);

  // clear button
  clear = createButton('clear');
  buttonDiv.child(clear)
  clear.mousePressed(clearIngredients);

  // ingredients list title
  let ingredientListTitle = createP('Ingredient List:');
  ingredientListTitle.style('font-size', '2.5em');
  ingredientListTitle.style('font-weight', 'bold');
  ingredientListTitle.style('font-style', 'italic');

  // create a div for where recipes are to be displayed
  div = createDiv();
  div.addClass('ingredient-div');
}

// called when model is ready
function modelLoaded(){
  console.log('Model Loaded');
  
  // call to classifyIngredient once model is loaded
  classifyIngredient();
}

// predict what ingredient is being shown in the video
function classifyIngredient(){
  // call to classify on ingredientClassifier with callback function gotIngredient
  ingredientClassifier.classify(gotIngredient);
}

// gets called when ingredient is classified
function gotIngredient(error, ingredients){
  // display ingredient classified
  ingredientText.html(ingredients[0].label);
  ingredientName = ingredients[0].label;
  // classifyIngredient call again, so it happens continuously
  classifyIngredient();
}

// gets called when user clicks save
function displayIngredient(){
  // push ingredient onto ingredientsSaved array
  ingredientsSaved.push(ingredientName);
  // create a p element with the name of the ingredient
  let ingredientP = createP(ingredientName);
  // make the p element a child of the div
  div.child(ingredientP);
  // push p element of ingredient onto ingredientPArray
  ingredientPArray.push(ingredientP);
}

// start tau prolog sesson
var session = pl.create();

// gets called when user clicks search
function findRecipe(){
  // load recipes.pl file
  session.consult("/recipes.pl", {
    success:function(){
      // query recipes.pl with list of ingredients
      session.query("recipe("+ingredientsSaved.sort()+", X).", {
        success: function(goal){
          session.answer({
            success: function(answer){
              console.log(session.format_answer(answer));
              // call display recipe with result of query
              displayRecipe(session.format_answer(answer));
            }
          });
        }
      })
    },
    error: function(err){}
  });
}

// gets called after succesful query of recipes.pl
function displayRecipe(recipe){
  console.log(recipe);
  // creates a link to recipe found in recipeList
  recipeLink = createA(recipeList[recipe], 'recipe', '_blank');
  // center the link
  // recipeLink.center('horizontal');
  div.child(recipeLink);
}

// called when user clicks clear
function clearIngredients(){
  // make ingredientsSaved array empty
  ingredientsSaved = [];
  // delete all the ingredient p elements
  for(let i = 0; i < ingredientPArray.length; i++){
    ingredientPArray[i].remove();
  }
  // remove recipe link if present
  recipeLink.remove();
}