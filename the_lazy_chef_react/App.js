/**
 * Our group used Nicholas Renotte's React Computer Vision Template from GitHub for this project.
 * We modified the template and added our own code for our specific use case.
 * Adapted from: Nicholas Renotte--ReactComputerVisionTemplate
 * URL: https://github.com/nicknochnack/ReactComputerVisionTemplate
 * Retrieved: 5/8/2021
 */ 

// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import camera from "./camera.js";
import * as cvstfjs from '@microsoft/customvision-tfjs';
import { useMediaQuery } from 'react-responsive';
import {output, drawRect} from "./utilities";

// initialize tau-prolog object
var pl = require("tau-prolog");

/** 
 * React functional component App
 * where the ingredient object detection takes place
 */
function App(){
    // naming variables width and height to be used in the scope of the function
    let width;
    let height;

    // initialize states for ingredients, loading, and detectedSomething
    const [ingredients, setIngredients] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [detectedSomething, setdetectedSomething] = React.useState("not yet");

    // code within this block runs when the component has be renders to the DOM
    React.useEffect(() => {
      // set video and canvas size depending on window size
      if(document.getElementById('root').clientWidth <= 595) {
        // making the video and canvas dimensions smaller because the window is not wide
        width = document.getElementById('root').clientWidth-50;
        height = (480*width)/640;
        camera.startCamera(width,height);
      } else {
        // making the video and canvas dimensions 640x480 when the window is wide enough
        width = 640;
        height = 480;
        camera.startCamera(width, height);
      }
    }, [])

  // asynchronous callback function for when the user clicks the detect button 
  async function detectIngredients(){
    // set loading state to true
    setLoading(true);

    // pause the video feed
    camera.takeSnapshot();

    // detect objects using the customvision dependency
    let model = new cvstfjs.ObjectDetectionModel();
    await model.loadModelAsync(process.env.REACT_APP_MODEL_URL);
    const image = document.getElementById('video');
    const result = await model.executeAsync(image);

    // output classes, scores, and bounding boxes from the object detection
    console.log(result);
    
    // draw the bounding boxes
    drawRect(result[0], result[2], result[1], 0.25, width,height, camera.getCtx());
      
    // set the ingredient state to the array of ingredients detected
    setIngredients(output(result[0], result[2], result[1], 0.25));

    // set loading state to false
    setLoading(false);

    // set detected something to "yes" if something was detected, otherwise set it to "no"
    setdetectedSomething(output(result[0], result[2], result[1], 0.25).length > 0 ? "yes": "no");
  }
   
  // intialize media query object for smaller screens
  const isMobile = useMediaQuery({query: '(max-width: 578px)'});

  // variables theHeight and theWidth to be used in the scope of the App component
  let theHeight;
  let theWidth;

  // set theWidth depending on window size
  if(document.getElementById('root').clientWidth <= 595) {
    // set theWidth to root element client width minus 50
    theWidth = document.getElementById('root').clientWidth-50;
  } else {
    // set theWidth to 640
    theWidth = 640;
  }

  /**
   * if the window width is small, 
   * the height is modified according to a 640x480 ratio, 
   * otherwise the height is 535
   */
  isMobile? theHeight =(480*theWidth)/640+70 : theHeight = 535;

  // marginTop for the button is set to theHeight
  let mobile = {
    marginTop: `${theHeight}px`
  }

  /**
   * Render the JSX to the DOM
   * Displays title of the app
   * Displays detect button that can trigger object detection
   * Renders recipe component with the App states passed down as props
   */
  return(
    <div id="div" className="app-div">
      <h1 className="project-title">The Lazy Chef</h1>
      <button style={mobile}className="search-button" onClick={detectIngredients}>
        Detect
      </button>
      <Recipe ing={ingredients} detecting={loading} detected={detectedSomething}/>
  </div>
  );

}

/** 
 * React functional Recipe component
 * Performs search for recipe using tau-prolog
*/
function Recipe(props){
  // output ingredients detected
  console.log("ingredients: "+props.ing);

  // intialize recipe state
  const [recipe, setRecipe] = React.useState("");

  // object containing recipe links corresponding to successful prolog unification results
  let lookup = {
    "sorry, we didn't find any recipes for those ingredients :(": "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    "X = sausage_omelette.": "https://www.emerils.com/123033/pork-sausage-and-cheese-omelette",
    "X = bacon_omelette.": "https://www.recipetips.com/recipe-cards/t--37341/bacon-and-cheese-omelette.asp",
    "X = lumberjack_omelette.": "https://www.keyingredient.com/recipes/852875039/lumberjack-omelet/",
    "X = cheese_omelette.": "https://www.epicurious.com/recipes/food/views/cheese-omelette-51262180",
    "X = cheesy_bacon-sausage-egg-hash_brown_skillet.": "https://www.allrecipes.com/recipe/261541/cheesy-bacon-sausage-egg-hash-brown-skillet/",
    "X = sausage_breakfast_cassarole.": "https://www.simplyrecipes.com/recipes/sausage_breakfast_casserole/",
    "X = sheepherders_breakfast.": "https://www.tasteofhome.com/recipes/sheepherder-s-breakfast/",
    "X = sausage_breakfast_burrito.": "https://www.tasteofhome.com/recipes/sausage-breakfast-burritos/",
    "X = bacon_breakfast_burrito.": "https://peasandcrayons.com/2019/03/bacon-breakfast-burrito.html",
    "X = combo_breakfast_burrito.": "https://tasty.co/recipe/bacon-sausage-egg-wrapped-breakfast-burrito",
    "X = cheesy_hash_brown_bake.": "https://www.tasteofhome.com/recipes/cheesy-hash-brown-bake/",
    "X = berry_smoothie.": "https://www.dinneratthezoo.com/mixed-berry-smoothie/",
    "X = sweet_potato_and_egg_skillet.": "https://www.tasteofhome.com/recipes/sweet-potato-and-egg-skillet/",
    "X = hash_brown_egg_bake.": "https://www.tasteofhome.com/recipes/hash-brown-egg-bake/",
    "X = egg_sandwich.": "https://recipes.timesofindia.com/us/recipes/egg-sandwich/rs60018142.cms",
    "X = hard_boiled_egg.": "https://www.simplyrecipes.com/recipes/how_to_make_perfect_hard_boiled_eggs/",
    "X = toast.": "https://spicedblog.com/toast/",  
    "X = buttered_toast.": "https://jerryjamesstone.com/recipe/best-toast-with-butter/",
    "X = grilled_cheese.": "https://www.spendwithpennies.com/the-best-grilled-cheese-sandwich/",
    "X = fancy_sandwich.": "https://californiaavocado.com/recipe/fresh-california-avocado-and-turkey-sandwich/",
    "X = summer_blueberry_almond_salad.": "https://www.food.com/recipe/greens-with-blueberries-feta-and-almonds-301425",
    "X = baked_potato.": "https://www.gimmesomeoven.com/baked-potato/",
    "X = cheese_quesadilla.": "https://www.simplyrecipes.com/recipes/quesadilla/",
    "X = bean_and_cheese_burrito.": "https://www.isabeleats.com/bean-and-cheese-burritos/",
    "X = wrap.": "https://lmld.org/turkey-bacon-ranch-wraps/",
    "X = chef_salad.": "https://www.spendwithpennies.com/chefs-salad/",
    "X = lasagna.": "https://www.spendwithpennies.com/easy-homemade-lasagna/",
    "X = spaghetti.": "https://www.thewholesomedish.com/spaghetti/",
    "X = pizza.": "https://www.abeautifulplate.com/the-best-homemade-margherita-pizza/",
    "X = chicken_tacos.": "https://damndelicious.net/2019/08/06/easy-chicken-tacos/",
    "X = bacon_and_egg_pasta.": "https://www.foodnetwork.com/recipes/food-network-kitchen/bacon-and-egg-spaghetti-7232463",
    "X = brocolli_mac_and_cheese.": "https://www.dinneratthezoo.com/broccoli-mac-and-cheese/",
    "X = chicken_bake.": "https://easyfamilyrecipes.com/million-dollar-chicken-bake/",
    "X = lemon_garlic_chicken.": "https://rasamalaysia.com/lemon-garlic-chicken/",
    "X = hefty_wrap.": "https://www.withablast.net/deli-wraps/",
    "X = meatloaf.": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "X = vegetable_stir_fry.": "https://www.dinneratthezoo.com/vegetable-stir-fry/",
    "X = ice_cream_sandwich.": "https://www.ifyougiveablondeakitchen.com/cookie-ice-cream-sandwich/",
    "X = strawberry_milkshake.": "https://www.foodnetwork.com/recipes/fresh-strawberry-milkshakes-3644067",
    "X = chocolate_milkshake.": "https://www.bettycrocker.com/recipes/chocolate-milkshakes/7b7f7d41-4e3f-4bfa-b148-f29cc2a6b135",
    "X = smores.": "https://www.allrecipes.com/recipe/22146/smores/",
    "X = chocolate_covered_apple.": "https://www.allrecipes.com/recipe/63150/chocolate-dipped-apples/",
    "X = baked_egg_in_avocado.": "https://damndelicious.net/2016/10/05/baked-eggs-in-avocado/",
    "X = apple_avocado_salad.": "https://www.food.com/recipe/avocado-and-apple-salad-367163",
    "X = bell_pepper_omelette.": "https://www.thespruceeats.com/vegetarian-omelette-with-bell-peppers-3376569",
    "X = egg_butter.": "https://www.food.com/recipe/munavoi-finnish-egg-butter-180624",
    "X = scrambled_egg_with_sausage.": "https://sevensons.net/recipes/quick-and-simple-scrambled-eggs-with-sausage-and-cheese",
    "X = egg_and_onion.": "https://mondaymorningcookingclub.com.au/recipe/egg-and-onion-or-e-o/",
    "X = garlic_fried_eggs.": "https://www.thespruceeats.com/garlic-fried-eggs-recipe-2355700"
  };

  /**
   * call back function for when user clicks "Search"
   * finds recipe using prolog
   */
  function consultKnowledgeBase(e){
    // initialize ingredientArray to the array of detected ingredients
    let ingredientArray = props.ing;

    // output what ingredientArray is
    console.log("consultKnowledgeBase(sorted): "+ingredientArray.sort());
    
    // start tau prolog sesson
    var session = pl.create();

    
    // the prolog knowldege base with headless horn clauses that signify the relation between ingredients and recipe 
    const knowledgeBase = `
      recipe(bread, butter, buttered_toast).
      recipe(avocado, bread, cheese, lunch_meat, tomato, fancy_sandwich).
      recipe(almonds, balsamic_vinegar, blueberry, cheese, lettuce, mustard, summer_blueberry_almond_salad).     
      recipe(milk, potato, shredded_cheese, baked_potato).
      recipe(shredded_cheese, tortilla, cheese_quesadilla).
      recipe(bean, tortilla, bean_and_cheese_burrito).
      recipe(avocado, lunch_meat, tomato, tortilla, wrap).
      recipe(lettuce, lunch_meat, shredded_cheese, chef_salad).
      recipe(ground_beef, lasagna_noodle, shredded_cheese, tomato, lasagna).
      recipe(noodle, tomatoes, spaghetti).
      recipe(bread, shredded_cheese, tomatoes, pizza).
      recipe(chicken, tomato, tortilla, onion, chicken_tacos).
      recipe(bacon, egg, noodle, bacon_and_egg_pasta).
      recipe(brocolli, milk, noodle, shredded_cheese, brocolli_mac_and_cheese).
      recipe(chicken, shredded_cheese, tomato, chicken_bake).
      recipe(asparagus, chicken, garlic, lemon, lemon_garlic_chicken).
      recipe(avocado, carrot, lettuce, lunch_meat, tortilla, hefty_wrap).
      recipe(brocolli, ground_beef, ketchup, onion, sweet_potato, tomato, meatloaf).
      recipe(baby_corn, bell_pepper, brocolli, cucumber, green_bean, mushroom, soy_sauce, vegetable_stir_fry).
      recipe(cookie, ice_cream, ice_cream_sandwich).
      recipe(milk, strawberry, strawberry_milkshake).
      recipe(chocolate, milk, chocolate_milkshake).
      recipe(chocolate, marshmallow, smores).
      recipe(apple, chocolate, chocolate_covered_apple).
      recipe(cheese, egg, sausage, sausage_omelette).
      recipe(bacon, cheese, egg, bacon_omelette).
      recipe(bacon, cheese, egg, sausage, lumberjack_omelette).
      recipe(cheese, egg, cheese_omelette).
      recipe(bacon, bread, butter, cheese, egg, milk, potato, sausage, cheesy_bacon_sausage_egg_hash_brown_skillet).
      recipe(bread, egg, milk, mustard, shredded_cheese, sausage, sausage_breakfast_cassarole).
      recipe(bacon, egg, onion, potato, shredded_cheese, sheepherders_breakfast).
      recipe(egg, potato, sausage, tortilla, sausage_breakfast_burrito).
      recipe(bacon, egg, potato, tortilla, bacon_breakfast_burrito).
      recipe(bacon, egg, sausage, tortilla, potato, combo_breakfast_burrito).
      recipe(milk, potato, shredded_cheese, cheesy_hash_brown_bake).
      recipe(banana, blueberry, strawberry, berry_smoothie).
      recipe(butter, egg, garlic, sweet_potato, sweet_potato_and_egg_skillet).
      recipe(bacon, egg, milk, potato, shredded_cheese, hash_brown_egg_bake).
      recipe(egg, hard_boiled_egg).
      recipe(bread, egg, egg_sandwich).
      recipe(bread, toast).
      recipe(bread, cheese, grilled_cheese).
      recipe(avocado, egg, baked_egg_in_avocado).
      recipe(apple, avocado, apple_avocado_salad).
      recipe(bell_pepper, egg, bell_pepper_omelette).
      recipe(butter, egg, egg_butter).
      recipe(egg, sausage, scrambled_egg_with_sausage).
      recipe(egg, onion, egg_and_onion).
      recipe(egg, garlic, garlic_fried_eggs).
    `

    // consulting the knowledge base
    session.consult(knowledgeBase, {
      success:function() {
        // query knowledgeBase with the sorted list of detected ingredients
        session.query("recipe("+[ingredientArray].sort()+", X).", {
          success: function(goal) {
            session.answer({
              success: function(answer) {
                // output result of the query
                console.log(session.format_answer(answer));

                // set recipe state to the result of query
                setRecipe(session.format_answer(answer));
              }
            });
          }
        })
      },
      error: function(err) {
        // throw error message if there is an error
        console.log("error: "+err);

        // set recipe state to empty string
        setRecipe("");
      }
    });

    // set recipe state to the sorry message if recipe state is the empty string
    if(recipe.length == 0){
      setRecipe("sorry, we didn't find any recipes for those ingredients :(");
    }
    
  }

  /**
   * Render the JSX elements to  the DOM
   * Queries knowledge base with the detected ingredients to find recipe
   * Conditionally renders loading or unsuccesful event elements
   */
  return(
    <>
      <button id="search" className="search-button" onClick={consultKnowledgeBase}>
        Search
      </button>
      <div style={{height: 30}}></div>
      <a className="link" target="_blank" href={lookup[recipe]} >{recipe}</a>
      {props.detecting &&
      <>
        <div className="spinner"/>
        <p className="link">looking for ingredients...</p>
      </>
      }
      {props.detected === "no" && <p className="link">sorry, nothing was detected :(</p>}
      <div style={{height: 30}}></div>
    </>
  )
}

// export the App component
export default App;