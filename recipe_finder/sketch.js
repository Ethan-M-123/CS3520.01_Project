// video capture object to be initialized
let capture;
// object detector object to be initialized
let ingredientDetector;
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
  "X = eggInHole.": "https://www.allrecipes.com/recipe/187850/egg-in-a-hole/",
  
  %breakfast
  "X = Sausage_Omelette.": "https://www.emerils.com/123033/pork-sausage-and-cheese-omelette",
  "X = Bacon_Omelette.": "https://www.recipetips.com/recipe-cards/t--37341/bacon-and-cheese-omelette.asp",
  "X = Lumberjack_Omelette.": "https://www.keyingredient.com/recipes/852875039/lumberjack-omelet/",
  "X = Cheese_Omelette.": "https://www.epicurious.com/recipes/food/views/cheese-omelette-51262180",
  "X = Cheesy_Bacon-Sausage-Egg-Hash_Brown_Skillet.": "https://www.allrecipes.com/recipe/261541/cheesy-bacon-sausage-egg-hash-brown-skillet/",
  "X = Sausage_breakfast_Cassarole.": "https://www.simplyrecipes.com/recipes/sausage_breakfast_casserole/",
  "X = Sheepherders_Breakfast.": "https://www.tasteofhome.com/recipes/sheepherder-s-breakfast/",
  "X = Sausage_Breakfast_Burrito.": "https://www.tasteofhome.com/recipes/sausage-breakfast-burritos/",
  "X = Bacon_Breakfast_Burrito.": "https://peasandcrayons.com/2019/03/bacon-breakfast-burrito.html",
  "X = Combo_Breakfast_Burrito.": "https://tasty.co/recipe/bacon-sausage-egg-wrapped-breakfast-burrito",
  "X = Cheesy_Hash_Brown_Bake.": "https://www.tasteofhome.com/recipes/cheesy-hash-brown-bake/",
  "X = Berry_Smoothie.": "https://www.dinneratthezoo.com/mixed-berry-smoothie/",
  "X = Sweet_Potato_and_Egg_Skillet.": "https://www.tasteofhome.com/recipes/sweet-potato-and-egg-skillet/",
  "X = Hash_Brown_Egg_Bake.": "https://www.tasteofhome.com/recipes/hash-brown-egg-bake/",
  
  
  %lunch
  "X = grilled_cheese.": "https://www.spendwithpennies.com/the-best-grilled-cheese-sandwich/",
  "X = fancy_sandwich.": "https://californiaavocado.com/recipe/fresh-california-avocado-and-turkey-sandwich/",
  "X = Summer_Blueberry_Almond_Salad.": "https://www.food.com/recipe/greens-with-blueberries-feta-and-almonds-301425",
  "X = Baked_Potato.": "https://www.gimmesomeoven.com/baked-potato/",
  "X = Cheese_Quesadilla.": "https://www.simplyrecipes.com/recipes/quesadilla/",
  "X = Bean_and_Cheese_Burrito.": "https://www.isabeleats.com/bean-and-cheese-burritos/",
  "X = Meat_Wrap.": "https://lmld.org/turkey-bacon-ranch-wraps/",
  "X = Chef_Salad.": "https://www.spendwithpennies.com/chefs-salad/",
  
  %dinner
  "X = Lasagna.": "https://www.spendwithpennies.com/easy-homemade-lasagna/",
  "X = Spaghetti.": "https://www.thewholesomedish.com/spaghetti/",
  "X = Pizza.": "https://www.abeautifulplate.com/the-best-homemade-margherita-pizza/",
  "X = Chicken_Tacos.": "https://damndelicious.net/2019/08/06/easy-chicken-tacos/",
  "X = Bacon_and_Egg_Pasta.": "https://www.foodnetwork.com/recipes/food-network-kitchen/bacon-and-egg-spaghetti-7232463",
  "X = Brocolli_Mac&Cheese.": "https://www.dinneratthezoo.com/broccoli-mac-and-cheese/",
  "X = Chicken_Bake.": "https://easyfamilyrecipes.com/million-dollar-chicken-bake/",
  "X = Lemon_Garlic_Chicken.": "https://rasamalaysia.com/lemon-garlic-chicken/",
  "X = Hefty_Wrap.": "https://www.withablast.net/deli-wraps/",
  "X = Meatloaf.": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "X = Vegetable_Stir_Fry.": "https://www.dinneratthezoo.com/vegetable-stir-fry/",
  
  %dessert
  "X = ice_cream_sandwich.": "https://www.ifyougiveablondeakitchen.com/cookie-ice-cream-sandwich/",
  "X = strawberry_milkshake.": "https://www.foodnetwork.com/recipes/fresh-strawberry-milkshakes-3644067",
  "X = chocolate_milkshake.": "https://www.bettycrocker.com/recipes/chocolate-milkshakes/7b7f7d41-4e3f-4bfa-b148-f29cc2a6b135",
  "X = smores.": "https://www.allrecipes.com/recipe/22146/smores/",
  "X = Chocolate_Covered_Apple.": "https://www.allrecipes.com/recipe/63150/chocolate-dipped-apples/"

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
