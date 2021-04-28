// video capture object to be initialized
let capture;
// object detector object to be initialized
let ingredientDetecor;
// text of ingredient to be initialized
let loadingText;
// button for saving ingredient
let button;
// ingredients detected array
let ingredientsDetected = [];
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
// ingredient array
let ingredientArray = [];

// function for what happens once project is run
function setup() {
  // make a canvas
  createCanvas(640, 480);
  
  // initializes video capture object
  capture = createCapture(VIDEO, videoLoaded);
  capture.size(640, 480);
  capture.hide();
  
  // shows loading if model isn't ready yet
  loadingText = createP('loading...');

  // create a button div
  buttonDiv = createDiv();
  buttonDiv.addClass('button-div');
  
  // search button
  search = createButton('search');
  buttonDiv.child(search);
  search.mousePressed(findRecipe);

  // recipe list title
  let recipeList = createP('Recipe:');
  recipeList.style('font-size', '2.5em');
  recipeList.style('font-weight', 'bold');
  recipeList.style('font-style', 'italic');
}

// draw onto canvas
function draw(){
  image(capture, 0 ,0);

  for(let i = 0; i < ingredientArray.length; i++){
    const ingredientObject = ingredientArray[i];
    stroke(0, 255, 0);
    noFill();
    rect(ingredientObject['x'], ingredientObject['y'], ingredientObject['width'], ingredientObject['height']);
    noStroke();
    fill(255);
    textSize(24);
    text(ingredientObject['label'], ingredientObject.x + 10, ingredientObject.y + 24);
  }
}

// runs once video element is loaded
function videoLoaded(){
  // initializes object detector object
  ingredientDetector = ml5.objectDetector('cocossd', capture, modelLoaded);
}

// called when model is ready
function modelLoaded(){
  console.log('Model Loaded');
  loadingText.html('')
  // call to classifyIngredient once model is loaded
  detectIngredient();
}

// predict what ingredient is being shown in the video
function detectIngredient(){
  // call to classify on ingredientClassifier with callback function gotIngredient
  ingredientDetector.detect(ingredientDetected);
}

// gets called when ingredient is classified
function ingredientDetected(error, ingredients){
  // get food labels from ingredients array
  ingredientsDetected = ingredients.map(x => x['label'])
  // print food labels
  console.log(ingredientsDetected)
  // ingredientArray refers to ingredients
  ingredientArray = ingredients
  // call detectIngredient again
  detectIngredient();
}

// start tau prolog sesson
var session = pl.create();

// gets called when user clicks search
function findRecipe(){
  // load recipes.pl file
  session.consult("/recipes.pl", {
    success:function(){
      // query recipes.pl with list of ingredients
      session.query("recipe("+ingredientsDetected.sort()+", X).", {
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
  // recipeLink.center('horizontal');
  div.child(recipeLink);
}