// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import {output, drawRect} from "./utilities"
var pl = require("tau-prolog");

    const videoConstraints = {
      facingMode: { exact: "environment" }
    };
    tf.ENV.set('WEBGL_CONV_IM2COL', false);


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [ingredients, setIngredients] = React.useState([]);

  // const backend = tf.backend();

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    // https://raw.githubusercontent.com/Ethan-M-123/ObjDetectModel/main/cvai%20model/model.json
    // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
    // https://raw.githubusercontent.com/hugozanini/TFJS-object-detection/master/models/kangaroo-detector/model.json
    // const net = await tf.loadGraphModel('https://raw.githubusercontent.com/SaschaDittmann/tfjs-cv-objectdetection/master/static/model/model.json');
    // https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json
    const net = await tf.loadGraphModel('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');
    
    //  Loop and detect hands
    // setInterval(() => {
    //   detect(net);
    // }, 16.7);

    setInterval(() => {
      detect(net);
    }, 10);
  };

  function _logistic(x) {
    if (x > 0) {
        return (1 / (1 + Math.exp(-x)));
    } else {
        const e = Math.exp(x);
        return e / (1 + e);
    }
  }

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // const backend = tf.backend();

      const ANCHORS = [0.573, 0.677, 1.87, 2.06, 3.34, 5.47, 7.88, 3.53, 9.77, 9.17];
      // tf.engine().startScope();
      // 4. TODO - Make Detections
      // const img = tf.browser.fromPixels(video);
      let img = tf.browser.fromPixels(video);
      // const resized = tf.image.resizeBilinear(img, [640,480]);
      // const resized = tf.image.resizeBilinear(img, [416,416]);
      img = tf.image.resizeBilinear(img.expandDims().toFloat(), [416,416]);
      // const casted = resized.cast('int32');
      // const casted = resized.cast('float32');
      // const expanded = casted.expandDims(0);
      try{
        const outputs = await net.execute(img);
        // const obj = await net.execute(expanded);
        // const tensor = await obj.arraySync();
        const arrays = !Array.isArray(outputs) ? outputs.array() : Promise.all(outputs.map(t => t.array()));
        let predictions = await arrays;
        // console.log(outputs);
        
        
          const num_anchor = ANCHORS.length / 2;
          const channels = predictions[0][0][0].length;
          const height = predictions[0].length;
          const width = predictions[0][0].length;

          const num_class = channels / num_anchor - 5;

		      let boxes = [];
	      	let scores = [];
		      let classes = [];

          // for (var grid_y = 0; grid_y < height; grid_y++) {
          //   for (var grid_x = 0; grid_x < width; grid_x++) {
          //     let offset = 0;
      
          //     for (var i = 0; i < num_anchor; i++) {
          //       let x = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) / width;
          //       let y = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) / height;
          //       let w = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width;
          //       let h = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height;
      
          //       let objectness = tf.scalar(_logistic(predictions[0][grid_y][grid_x][offset++]));
          //       let class_probabilities = tf.tensor1d(predictions[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax();
          //       offset += num_class;
      
          //       class_probabilities = class_probabilities.mul(objectness);
          //       let max_index = class_probabilities.argMax();
          //       boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
          //       scores.push(class_probabilities.max().dataSync()[0]);
          //       classes.push(max_index.dataSync()[0]);
          //     }
          //   }
          // }

          for(let j = 0; j < height*width; j++){
            var grid_y = Math.floor(j / width);
            var grid_x = j % width;
            
            let offset = 0;
      
              for (var i = 0; i < num_anchor; i++) {
                let x = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) / width;
                let y = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) / height;
                let w = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width;
                let h = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height;
      
                let objectness = tf.scalar(_logistic(predictions[0][grid_y][grid_x][offset++]));
                let class_probabilities = tf.tensor1d(predictions[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax();
                offset += num_class;
      
                class_probabilities = class_probabilities.mul(objectness);
                tf.dispose(objectness)
                let max_index = class_probabilities.argMax();
                boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
                scores.push(class_probabilities.max().dataSync()[0]);
                classes.push(max_index.dataSync()[0]);
                tf.dispose(class_probabilities)
              }

          }

          boxes = tf.tensor2d(boxes);
		      scores = tf.tensor1d(scores);
		      classes = tf.tensor1d(classes);

          const selected_indices = await tf.image.nonMaxSuppressionAsync(boxes, scores, 10);
		      predictions = [await boxes.gather(selected_indices).array(), await scores.gather(selected_indices).array(), await classes.gather(selected_indices).array()];

          // const selected_indices = tf.image.nonMaxSuppression(boxes, scores, 10)[1];
		      // predictions = [boxes.gather(selected_indices).array()[1], scores.gather(selected_indices).array()[1], classes.gather(selected_indices).array()[1]];
          // predictions = [await boxes.gather(selected_indices).arraySync(), await scores.gather(selected_indices).arraySync(), await classes.gather(selected_indices).arraySync()];

        

        // console.log(predictions);

        boxes = await predictions[0];
        classes = await predictions[2];
        scores = await predictions[1];

        // const boxes = await obj[0];
        // const classes = await obj[5];
        // const scores = await obj[4];

  

        // console.log("boxes[0]: " + boxes[0]);
        // console.log("Classes[0][0]: " + classes[0]);
        // console.log("Scores: "+ scores[0]);

        // Draw mesh
        const ctx = canvasRef.current.getContext("2d");

        // 5. TODO - Update drawing utility
        // drawSomething(obj, ctx)  
        requestAnimationFrame(()=>{drawRect(boxes, classes, scores, 0.1, videoWidth, videoHeight, ctx)});

        setIngredients(output(boxes, classes, scores, 0.1));

        tf.dispose(img);
        // tf.dispose(resized);
        // tf.dispose(casted);
        // tf.dispose(expanded);
        // tf.dispose(obj);
        tf.dispose(outputs);
        tf.dispose(selected_indices);
        // tf.dispose(backend);
        // tf.engine().endScope()
      } catch(error){
        tf.dispose(img);
        // tf.dispose(backend);
        // tf.dispose(img);
        // tf.dispose(resized);
        // tf.dispose(casted);
        // tf.dispose(expanded);
        // tf.engine().endScope();
        console.log(error);
      }
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <h1 className="project-title">The Lazy Chef</h1>
        <Webcam
          ref={webcamRef}
          videoConstraints={videoConstraints}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",

            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      {/* </header> */}
        <Recipe ing={ingredients}/>
    </div>
  );
}

function Recipe(props){
  console.log(props.ing)
  const [recipe, setRecipe] = React.useState("");

  let lookup = {
     "X = zest.": "https://www.culinaryhill.com/how-to-zest-a-lemon/",
    "X = nothing.": "https://www.allrecipes.com/"
  }



  function displayInfo(e){
    let ingredientArray = props.ing
    console.log(ingredientArray)
         // start tau prolog sesson
    var session = pl.create();
    // load recipes.pl file
    const prolog = `
      recipe(lemon, zest).
      recipe(bread, nutella, breadAndNutella).
      recipe(avocado, bread, egg, avocadoToast).
      recipe(cheese, tortilla, quesadilla).
      recipe(bread, cheese, egg, eggAndCheeseToast).
      recipe(bread, egg, eggInHole).
    
      recipe(hello, no, nothing).
    `
    session.consult(prolog, {
      success:function(){
        // query recipes.pl with list of ingredients
        session.query("recipe("+ingredientArray.sort()+", X).", {
          success: function(goal){
            session.answer({
              success: function(answer){
                console.log(session.format_answer(answer));
                // call display recipe with result of query
                setRecipe(session.format_answer(answer));
              }
            });
          }
        })
      },
      error: function(err){
        console.log("didn't work")
      }
    });
  }


  return(
    <>
      <button className="search-button" onClick={displayInfo}>
        Search
      </button>
      <div style={{height: 30}}></div>
      <a className="link" target="_blank" href={lookup[recipe]} >{recipe}</a>
    </>
  )
}

export default App;
