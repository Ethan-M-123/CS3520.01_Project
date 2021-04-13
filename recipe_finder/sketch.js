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
  "X = zest.": "https://www.culinaryhill.com/how-to-zest-a-lemon/"
};

// function for what happens once project is run
function setup() {
  noCanvas();
  
  // initializes video capture object
  capture = createCapture(VIDEO);
  
  // initializes image classifier object
  ingredientClassifier = ml5.imageClassifier('MobileNet', capture, modelLoaded)
  
  // shows loading if model isn't ready yet
  ingredientText = createP('loading...');
  
  // create a save button
  button = createButton('save');
  button.mousePressed(displayIngredient);
  
  // search button
  search = createButton('search');
  search.mousePressed(findRecipe);
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

function displayIngredient(){
  ingredientsSaved.push(ingredientName);
  createP(ingredientName);
}

var session = pl.create();

function findRecipe(){
  
  session.consult("recipe(lemon, zest).", {
    success:function(){
      session.query("recipe("+ingredientsSaved+", X).", {
        success: function(goal){
          session.answer({
            success: function(answer){
              console.log(session.format_answer(answer));
              displayRecipe(session.format_answer(answer));
            }
          });
        }
      })
    },
    error: function(err){}
  });
}

function displayRecipe(recipe){
  createA(recipeList[recipe], 'recipe', '_blank');
}