// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import camera from "./camera.js"
import * as cvstfjs from '@microsoft/customvision-tfjs';
import { useMediaQuery } from 'react-responsive'
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import {output, drawRect} from "./utilities"
var pl = require("tau-prolog");

//     const videoConstraints = {
//       facingMode: { exact: "environment" }
//     };
//     tf.ENV.set('WEBGL_CONV_IM2COL', false);
console.log(document.getElementById('root').clientWidth)
// if(window.screen.width <= 655){
//   camera.startCamera(window.screen.width-20,360);
// }else{
//   camera.startCamera(480,360);
// }

// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [ingredients, setIngredients] = React.useState([]);
  
//   // const backend = tf.backend();

//   // Main function
//   const runCoco = async () => {
//     // 3. TODO - Load network 
//     // e.g. const net = await cocossd.load();
//     // https://raw.githubusercontent.com/Ethan-M-123/ObjDetectModel/main/cvai%20model/model.json
//     // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
//     // https://raw.githubusercontent.com/hugozanini/TFJS-object-detection/master/models/kangaroo-detector/model.json
//     // const net = await tf.loadGraphModel('https://raw.githubusercontent.com/SaschaDittmann/tfjs-cv-objectdetection/master/static/model/model.json');
//     // https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json
//     const net = await tf.loadGraphModel('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');
    
//     //  Loop and detect hands
//     setInterval(() => {
//       detect(net);
//     }, 16.7);



    
//   };

//   // function _logistic(x) {
//   //   if (x > 0) {
//   //       return (1 / (1 + Math.exp(-x)));
//   //   } else {
//   //       const e = Math.exp(x);
//   //       return e / (1 + e);
//   //   }
//   // }

//   const detect = async (net) => {
    
    
//     // let model = new cvstfjs.ObjectDetectionModel();
//     // await model.loadModelAsync('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');
//     // const image = document.getElementById('video');
//     // const result = await model.executeAsync(image);
//     // console.log(result);

//     // Check data is available
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//     //   // Get Video Properties
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//     //   // Set video width
//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;

//     //   // Set canvas height and width
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//     //   // const backend = tf.backend();

//     //   const ANCHORS = [0.573, 0.677, 1.87, 2.06, 3.34, 5.47, 7.88, 3.53, 9.77, 9.17];
//     //   // tf.engine().startScope();
//     //   // 4. TODO - Make Detections
//       const img = tf.browser.fromPixels(video);
//     //   let outputs = tf.tidy( () =>{
//     //     let img = tf.browser.fromPixels(video);
//     //     // const resized = tf.image.resizeBilinear(img, [640,480]);
//         const resized = tf.image.resizeBilinear(img, [416,416]);
//     //     // let newImg = tf.image.resizeBilinear(img.expandDims().toFloat(), [416,416]);
//     //     // const casted = resized.cast('int32');
//         const casted = resized.cast('float32');
//         // const expanded = casted.expandDims(0);
//     //     const newImg = casted.expandDims(0);
//     //     // try{
//     //       // return await net.execute(newImg);
//     //       return net.execute(newImg);
//     //   })
      
//     //     // const obj = await net.execute(expanded);
//     //     // const tensor = await obj.arraySync();
//     //     const arrays = !Array.isArray(outputs) ? outputs.array() : Promise.all(outputs.map(t => t.array()));
//     //     let predictions = await arrays;
      
//     //     // console.log(outputs);
        
        
//     //       const num_anchor = ANCHORS.length / 2;
//     //       const channels = predictions[0][0][0].length;
//     //       const height = predictions[0].length;
//     //       const width = predictions[0][0].length;

//     //       const num_class = channels / num_anchor - 5;

// 		//       let boxes = [];
// 	  //     	let scores = [];
// 		//       let classes = [];

//     //       // for (var grid_y = 0; grid_y < height; grid_y++) {
//     //       //   for (var grid_x = 0; grid_x < width; grid_x++) {
//     //       //     let offset = 0;
      
//     //       //     for (var i = 0; i < num_anchor; i++) {
//     //       //       let x = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) / width;
//     //       //       let y = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) / height;
//     //       //       let w = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width;
//     //       //       let h = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height;
      
//     //       //       let objectness = tf.scalar(_logistic(predictions[0][grid_y][grid_x][offset++]));
//     //       //       let class_probabilities = tf.tensor1d(predictions[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax();
//     //       //       offset += num_class;
      
//     //       //       class_probabilities = class_probabilities.mul(objectness);
//     //       //       let max_index = class_probabilities.argMax();
//     //       //       boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
//     //       //       scores.push(class_probabilities.max().dataSync()[0]);
//     //       //       classes.push(max_index.dataSync()[0]);
//     //       //     }
//     //       //   }
//     //       // }
           
           
//     //       let newStuff = tf.tidy(()=>{
//     //       for(let j = 0; j < height*width; j++){
//     //         var grid_y = Math.floor(j / width);
//     //         var grid_x = j % width;
            
//     //         let offset = 0;
      
//     //           for (var i = 0; i < num_anchor; i++) {
//     //             tf.tidy(()=>{
//     //               let x = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) / width;
//     //               let y = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) / height;
//     //               let w = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width;
//     //               let h = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height;
        
//     //               let objectness = tf.scalar(_logistic(predictions[0][grid_y][grid_x][offset++]));
//     //               let class_probabilities = tf.tensor1d(predictions[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax();
//     //               offset += num_class;
        
//     //               class_probabilities = class_probabilities.mul(objectness);
//     //               tf.dispose(objectness)
//     //               let max_index = class_probabilities.argMax();
//     //               boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
//     //               scores.push(class_probabilities.max().dataSync()[0]);
//     //               classes.push(max_index.dataSync()[0]);
//     //               tf.dispose(class_probabilities)
//     //               }
//     //             )
//     //           }

//     //       }

//     //       let new_boxes = tf.tensor2d(boxes);
// 		//       let new_scores = tf.tensor1d(scores);
// 		//       let new_classes = tf.tensor1d(classes);
//     //         return [new_boxes, new_scores, new_classes]}
//     //       )

//     //       const selected_indices = await tf.image.nonMaxSuppressionAsync(newStuff[0], newStuff[1], 10);
//     //       let box_index = await newStuff[0].gather(selected_indices);
//     //       let score_index = await newStuff[1].gather(selected_indices);
//     //       let class_index = await newStuff[2].gather(selected_indices)
// 		//       let newPredictions = [box_index.array(), score_index.array(), class_index.array()];

//     //       // const selected_indices = tf.image.nonMaxSuppression(boxes, scores, 10)[1];
// 		//       // predictions = [boxes.gather(selected_indices).array()[1], scores.gather(selected_indices).array()[1], classes.gather(selected_indices).array()[1]];
//     //       // predictions = [await boxes.gather(selected_indices).arraySync(), await scores.gather(selected_indices).arraySync(), await classes.gather(selected_indices).arraySync()];
//         let model = new cvstfjs.ObjectDetectionModel();
//         await model.loadModelAsync('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');
//         // const image = document.getElementById('video');
//         // const result = await model.executeAsync(image);
//         const result = await model.executeAsync(video);
//         console.log(result);
        

//     //     // console.log(predictions);

//         let newerBoxes = await result[0];
//         let newerClasses = await result[2];
//         let newerScores = await result[1];

//     //     // const boxes = await obj[0];
//     //     // const classes = await obj[5];
//     //     // const scores = await obj[4];

  

//         console.log("boxes: " + newerBoxes);
//         console.log("Classes: " + newerClasses);
//         console.log("Scores: "+ newerScores);

//     //     // Draw mesh
//     //     const ctx = canvasRef.current.getContext("2d");
//         const ctx = camera.getCtx();

//     //     // 5. TODO - Update drawing utility
//     //     // drawSomething(obj, ctx)  
//         requestAnimationFrame(()=>{drawRect(newerBoxes, newerClasses, newerScores, 0.1, 480, 360, ctx)});

//         setIngredients(output(newerBoxes, newerClasses, newerScores, 0.1));

//     //     // tf.dispose(img);
//     //     // tf.dispose(newImg);
//     //     // tf.dispose(resized);
//     //     // tf.dispose(casted);
//     //     // tf.dispose(expanded);
//     //     // tf.dispose(obj);
//     //     // tf.dispose(new_boxes);
//     //     // tf.dispose(new_scores);
//     //     // tf.dispose(new_classes);
//     //     // tf.dispose(box_index);
//     //     // tf.dispose(score_index);
//     //     // tf.dispose(class_index);
//     //     // tf.dispose(outputs);
//     //     tf.dispose(selected_indices);
//     //     tf.dispose(arrays);
//     //     // tf.engine().endScope()


//     //        tf.dispose(boxes);
//     //     tf.dispose(scores);
//     //     tf.dispose(classes);
//     //     tf.dispose(newerBoxes);
//     //     tf.dispose(newerScores);
//     //     tf.dispose(newerClasses);
//     //       tf.dispose(box_index);
//     //     tf.dispose(score_index);
//     //     tf.dispose(class_index);
//     //     tf.dispose(selected_indices);
//     //     tf.dispose(newStuff);
//     //     tf.dispose(predictions);
//     //     tf.dispose(newPredictions);
//     //     tf.dispose(arrays);
//     //     tf.dispose(outputs);
//     //     // console.log(tf.memory().numTensors)
//     //   // } catch(error){
//     //     // // tf.dispose(img);
//     //     // // tf.dispose(arrays);
//     //     // tf.dispose(newImg);
//     //     // tf.dispose(resized);
//     //     // tf.dispose(casted);
//     //     // // tf.dispose(expanded);
//     //     // // tf.engine().endScope();
//     //     // console.log(error);
//     //   // }
//     }
//   };

//   useEffect(()=>{runCoco()},[]);

//   return (
//     <div className="App">
//       {/* <header className="App-header"> */}
//         <h1 className="project-title">The Lazy Chef</h1>
//         <Webcam
//           ref={webcamRef}
//           videoConstraints={videoConstraints}
//           muted={true} 
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",

//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />

//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       {/* </header> */}
//         <Recipe ing={ingredients}/>
//     </div>
//   );
// }

function App(){
//   const ANCHORS = [0.573, 0.677, 1.87, 2.06, 3.34, 5.47, 7.88, 3.53, 9.77, 9.17];
//   const NEW_OD_OUTPUT_TENSORS = ['detected_boxes', 'detected_scores', 'detected_classes'];
//   let model;
//   let tensor;
//   let thePredictions;
    let width;
    let height;
    const [ingredients, setIngredients] = React.useState([]);

    React.useEffect(()=>{
    // const [ingredients, setIngredients] = React.useState([]);
    console.log(document.getElementById('root').clientWidth)
    if(document.getElementById('root').clientWidth <= 595){
      width = document.getElementById('root').clientWidth-50;
      height = (480*width)/640
      camera.startCamera(width,height);
    }else{
      width = 640;
      height = 480;
      camera.startCamera(width, height);
    }}, [])

//   function _logistic(x) {
// 	if (x > 0) {
// 	    return (1 / (1 + Math.exp(-x)));
// 	} else {
// 	    const e = Math.exp(x);
// 	    return e / (1 + e);
// 	}
// }

//   camera.startCamera();
//   const detect = async ()=>{
//     model = await tf.loadGraphModel('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json')
//     let image = tf.tidy(()=>{
      // const pixels = camera.videoElement();
//       const input_size = model.inputs[0].shape[1];
//       // console.log(input_size);
//       let image = tf.browser.fromPixels(pixels, 3);
//       image = tf.image.resizeBilinear(image.expandDims().toFloat(), [input_size, input_size])
//       return image;
//     });
//     // const resized = tf.image.resizeBilinear(img, [640,480])
//     // const casted = resized.cast('int32')
//     // const expanded = casted.expandDims(0)
//     // const obj = await net.executeAsync(expanded)
//     // console.log(img);
//     // tf.dispose(model);
//     console.log("model in detect(): "+model)
//     tensor = image;
//     console.log("image: "+image)
//     return image;
//     let model = new cvstfjs.ObjectDetectionModel();
//     await model.loadModelAsync('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');
//     const image = document.getElementById('video');
//     const result = await model.executeAsync(image);
//     console.log(result);
//   };

//   const predictIngredients= async (inputs)=>{
//     if(typeof model == "undefined"){
//       model = await tf.loadGraphModel('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json')
//     }
//     console.log("model: "+model);
//     console.log("inputs: "+inputs)
//     // console.log("Number of tensors: "+tf.memory().numTensors)
//     console.log();
//     inputs = tensor;
//     const outputs = await model.executeAsync(inputs);
// 	  const arrays = !Array.isArray(outputs) ? outputs.array() : Promise.all(outputs.map(t => t.array()));
// 	  let predictions = await arrays;

//     const num_anchor = ANCHORS.length / 2;
// 		const channels = predictions[0][0][0].length;
// 		const height = predictions[0].length;
// 		const width = predictions[0][0].length;

// 		const num_class = channels / num_anchor - 5;

// 		let boxes = [];
// 		let scores = [];
// 		let classes = [];

// 		for (var grid_y = 0; grid_y < height; grid_y++) {
// 			for (var grid_x = 0; grid_x < width; grid_x++) {
// 				let offset = 0;

// 				for (var i = 0; i < num_anchor; i++) {
// 					let x = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) / width;
// 					let y = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) / height;
// 					let w = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width;
// 					let h = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height;

// 					let objectness = tf.scalar(_logistic(predictions[0][grid_y][grid_x][offset++]));
// 					let class_probabilities = tf.tensor1d(predictions[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax();
// 					offset += num_class;

// 					class_probabilities = class_probabilities.mul(objectness);
// 					let max_index = class_probabilities.argMax();
// 					boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
// 					scores.push(class_probabilities.max().dataSync()[0]);
// 					classes.push(max_index.dataSync()[0]);
// 				}
// 			}
// 		}

//     boxes = tf.tensor2d(boxes);
// 		scores = tf.tensor1d(scores);
// 		classes = tf.tensor1d(classes);

// 		const selected_indices = await tf.image.nonMaxSuppressionAsync(boxes, scores, 10);
// 		predictions = [await boxes.gather(selected_indices).array(), await scores.gather(selected_indices).array(), await classes.gather(selected_indices).array()];

//     thePredictions = predictions;
//     // console.log(thePredictions)
//     return predictions;
//   }

  // async function highlightResults(predictions) {
  //   console.log( "Highlighting results..." );
  //   await $('.progress-bar').html("Highlighting results").promise();
  
  //   removeHighlights();
    
  //   for (let n = 0; n < predictions[0].length; n++) {
  //     // Check scores
  //     if (predictions[1][n] > 0.66) {
  //       const p = document.createElement('p');
  //       p.innerText = TARGET_CLASSES[predictions[2][n]]  + ': ' 
  //         + Math.round(parseFloat(predictions[1][n]) * 100) 
  //         + '%';
        
  //       bboxLeft = (predictions[0][n][0] * selectedImage.width) + 10;
  //       bboxTop = (predictions[0][n][1] * selectedImage.height) - 10;
  //       bboxWidth = (predictions[0][n][2] * selectedImage.width) - bboxLeft + 20;
  //       bboxHeight = (predictions[0][n][3] * selectedImage.height) - bboxTop + 10;
        
  //       p.style = 'margin-left: ' + bboxLeft + 'px; margin-top: '
  //         + (bboxTop - 10) + 'px; width: ' 
  //         + bboxWidth + 'px; top: 0; left: 0;';
  //       const highlighter = document.createElement('div');
  //       highlighter.setAttribute('class', 'highlighter');
  //       highlighter.style = 'left: ' + bboxLeft + 'px; top: '
  //         + bboxTop + 'px; width: ' 
  //         + bboxWidth + 'px; height: '
  //         + bboxHeight + 'px;';
  //       imageOverlay.appendChild(highlighter);
  //       imageOverlay.appendChild(p);
  //       children.push(highlighter);
  //       children.push(p);
  //     }
  //   }
  // }

  // const loadImage = async () => {
  //   return await detect();
  // }

  // const predictingIngredients = async (image) => {
  //   return await predictIngredients(image);
  // }

  // // const resultsHighlight = async (predictions) =>{
  // //   return await highlightResults(predictions)
  // // }

  // const theClass = async (predictions) =>{
  //     return await predictions[2];
  //   }
  //   const theBox = async (predictions) =>{
  //       return await predictions[0];
  //     }
  //     const theScore = async (predictions) =>{
  //         return await predictions[1];
  //       }

  //       const arrayS = async (array) =>{
  //         return await array;
  //       }

  // const predictAsync = (predictions) =>{
  //   console.log(predictions);
  //   thePredictions = predictions;
  // }

  async function detectIngredients(){
    camera.takeSnapshot();
  //   for(let i = 0; i<document.getElementsByClassName('video').length; i++){
  //     document.getElementsByClassName('video')[i].pause();
  // }
    let model = new cvstfjs.ObjectDetectionModel();
    await model.loadModelAsync(process.env.REACT_APP_MODEL_URL);
    // const image = document.getElementById('canvas');
    const image = document.getElementById('video');
    const result = await model.executeAsync(image);
    console.log(result);
    // let newerBoxes = result[0];
    //   let newerClasses = result[2];
    //   let newerScores = result[1];

    //   const ctx = camera.getCtx();


    //   drawRect(newerBoxes, newerClasses, newerScores, 0.1, 480, 360, ctx)
    // camera.takeSnapshot();
    drawRect(result[0], result[2], result[1], 0.25, width,height, camera.getCtx())
      
      // console.log(output(result[0], result[2], result[1], 0.4));
    setIngredients(output(result[0], result[2], result[1], 0.25));
    
    // camera.takeSnapshot();
  //      for(let i = 0; i<document.getElementsByClassName('video').length; i++){
  //     document.getElementsByClassName('video')[i].pause();
  // }
  }
    // camera.takeSnapshot();
    // const image = loadImage();
    // console.log(image)
    // const predictions = predictingIngredients(image);
    // predictions.then((array)=>{
    //   console.log(array);
      // let newerBoxes = result[0];
      // let newerClasses = result[2];
      // let newerScores = result[1];

      // const ctx = camera.getCtx();

      // drawRect(newerBoxes, newerClasses, newerScores, 0.3, 480, 360, ctx)
      // console.log("boxes: " + newerBoxes);
      //         console.log("Classes: " + newerClasses);
      //         console.log("Scores: "+ newerScores);
    // });
    // console.log(predictions);

    // console.log("The Predictions: " +predictions);
    // const arrays = Promise.all(predictions);
	  // let thePredictions = arrayS()
    // console.log("The Predictions: " +thePredictions);

        // let newerBoxes = theBox(predictions);
        // let newerClasses = theClass(predictions);
        // let newerScores = theScore(predictions);
        // let newerBoxes = await newPredictions[0];
        //          let newerClasses = await newPredictions[2];
        //          let newerScores = await newPredictions[1];
  

        // console.log(newerBoxes);
        // console.log(newerClasses);
        // console.log(newerScores);
    // resultsHighlight();
    // console.log("Number of tensors: "+tf.memory().numTensors)
  // }
  const isMobile = useMediaQuery({query: '(max-width: 578px)'})
  let theHeight;
  let theWidth
  if(document.getElementById('root').clientWidth <= 595){
    theWidth = document.getElementById('root').clientWidth-50;
    // height = (480*width)/640
  
  }else{
    theWidth = 640;
    // height = 480;

  }
  isMobile? theHeight =(480*theWidth)/640+70 : theHeight = 535;

  let mobile = {
    marginTop: `${theHeight}px`
  }

  return(
    <div id="div" className="app-div">
      <h1 className="project-title">The Lazy Chef</h1>
      <button style={mobile}className="search-button" onClick={detectIngredients}>
        Snapshot
      </button>
      <Recipe ing={ingredients}/>
  </div>
  );

}

function Recipe(props){
  console.log("Recipe: "+props.ing)
  const [recipe, setRecipe] = React.useState("");

  let lookup = {
    
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
    "X = brocolli_mac&cheese.": "https://www.dinneratthezoo.com/broccoli-mac-and-cheese/",
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
    "X = baked_egg_in_avocado.": "https://damndelicious.net/2016/10/05/baked-eggs-in-avocado/"
  }



  function displayInfo(e){
    let ingredientArray = props.ing
    console.log("displayInfo: "+ingredientArray)
         // start tau prolog sesson
    var session = pl.create();
    // load recipes.pl file
    const prolog = `
    recipe(egg, cheese, sausage, sausage_omelette).
    recipe(egg, cheese, bacon, bacon_omelette).
recipe(egg, cheese, bacon, sausage, lumberjack_omelette).
recipe(egg, cheese, cheese_omelette).
recipe(egg, bacon, sausage, potato, bread, cheese, butter, milk, cheesy_bacon_sausage_egg_hash_brown_skillet).
recipe(sausage, egg, milk, mustard, bread, shredded_cheese, sausage_breakfast_cassarole).
recipe(bacon, onion, potato, egg, shredded_cheese, sheepherders_breakfast).
recipe(sausage, egg, tortilla, potato, sausage_breakfast_burrito).
recipe(bacon, egg, tortilla, potato, bacon_breakfast_burrito).
recipe(bacon, sausage, egg, tortilla, potato, combo_breakfast_burrito).
recipe(potato, shredded_cheese, milk, shredded_cheese, cheesy_hash_brown_bake).
recipe(strawberry, banana, blueberry, berry_smoothie).
recipe(butter, sweet_potato, garlic, egg, sweet_potato_and_egg_skillet).
recipe(potato, bacon, shredded_cheese, egg, milk, hash_brown_egg_bake).


      recipe(bread, cheese, grilled_cheese).
      recipe(bread, lunch_meat, cheese, tomato, avocado, fancy_sandwich).
      recipe(lettuce, blueberry, almonds, balsamic_vinegar, cheese, mustard, summer_blueberry_almond_salad).
      recipe(potato, milk, shredded_cheese, baked_potato).
      recipe(tortilla, shredded_cheese, cheese_quesadilla).
      recipe(bean, tortilla, bean_and_cheese_burrito).
      recipe(tortilla, tomato, avocado, lunch_meat, wrap).
      recipe(lunch_meat, lettuce, shredded_cheese, chef_salad).




    recipe(ground_beef, lasagna_noodle, tomato, shredded_cheese, lasagna).
    recipe(noodle, tomatoes, spaghetti).
    recipe(bread, shredded_cheese, tomatoes, pizza).
    recipe(tortilla, chicken, tomato, onion, chicken_tacos).
    recipe(noodle, bacon, egg, bacon_and_egg_pasta).
    recipe(brocolli, noodle, shredded_cheese, milk, brocolli_mac&cheese).
    recipe(chicken, tomato, shredded_cheese, chicken_bake).
    recipe(chicken, asparagus, lemon, garlic, lemon_garlic_chicken).
    recipe(lunch_meat, avocado, tortilla, lettuce, carrot, hefty_wrap).
    recipe(ground_beef, onion, tomato, brocolli, sweet_potato, ketchup, meatloaf).
    recipe(green_bean, brocolli, baby_corn, mushroom, bell_pepper, cucumber, soy_sauce, vegetable_stir_fry).


    recipe(cookie, ice_cream, ice_cream_sandwich).
    recipe(milk, strawberry, strawberry_milkshake).
    recipe(milk, chocolate, chocolate_milkshake).
    recipe(marshmallow, chocolate, smores).
    recipe(apple, chocolate, chocolate_covered_apple).
    recipe(egg, bread, egg_sandwich).
    recipe(egg, hard_boiled_egg).
    recipe(bread, toast).
    recipe(bread, butter, buttered_toast).
    `
    const egg = `
      recipe(egg, hard_boiled_egg).
      recipe(bread, egg, egg_sandwich).
      recipe(bread, toast).
      recipe(bread, cheese, grilled_cheese).
      recipe(avocado, egg, baked_egg_in_avocado).
    `

    session.consult(egg, {
      success:function(){
        // query recipes.pl with list of ingredients
        session.query("recipe("+[ingredientArray].sort()+", X).", {
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
        console.log(err)
      }
    });
  }


  return(
    <>
      <button id="search" className="search-button" onClick={displayInfo}>
        Search
      </button>
      <div style={{height: 30}}></div>
      <a className="link" target="_blank" href={lookup[recipe]} >{recipe}</a>
      <div style={{height: 30}}></div>
    </>
  )
}

// export default App;

// Import dependencies
// import React, { useRef, useState, useEffect } from "react";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";
// import * as cvstfjs from '@microsoft/customvision-tfjs';
// import "./App.css";
// // 2. TODO - Import drawing utility here
// // e.g. import { drawRect } from "./utilities";
// import {output, drawRect} from "./utilities"
// var pl = require("tau-prolog");

//     const videoConstraints = {
//       facingMode: { exact: "user" }
//     };
//     tf.ENV.set('WEBGL_CONV_IM2COL', false);


// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [ingredients, setIngredients] = React.useState([]);

//   // const backend = tf.backend();

//   // Main function
//   const runCoco = async () => {
//     // 3. TODO - Load network 
//     // e.g. const net = await cocossd.load();
//     // https://raw.githubusercontent.com/Ethan-M-123/ObjDetectModel/main/cvai%20model/model.json
//     // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
//     // https://raw.githubusercontent.com/hugozanini/TFJS-object-detection/master/models/kangaroo-detector/model.json
//     // const net = await tf.loadGraphModel('https://raw.githubusercontent.com/SaschaDittmann/tfjs-cv-objectdetection/master/static/model/model.json');
//     // https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json
//     const net = await tf.loadGraphModel('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');
    
//     //  Loop and detect hands
//     // setInterval(() => {
//     //   detect(net);
//     // }, 16.7);

//     setInterval(() => {
//       detect(net);
//     }, 10);
//   };

//   // function _logistic(x) {
//   //   if (x > 0) {
//   //       return (1 / (1 + Math.exp(-x)));
//   //   } else {
//   //       const e = Math.exp(x);
//   //       return e / (1 + e);
//   //   }
//   // }

//   const detect = async (net) => {
//     // Check data is available
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       // Get Video Properties
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//       // Set video width
//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;

//       // Set canvas height and width
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       // const backend = tf.backend();

//       // const ANCHORS = [0.573, 0.677, 1.87, 2.06, 3.34, 5.47, 7.88, 3.53, 9.77, 9.17];
//       // tf.engine().startScope();
//       // 4. TODO - Make Detections
//       // const img = tf.browser.fromPixels(video);
//       let img = tf.browser.fromPixels(video);
//       // const resized = tf.image.resizeBilinear(img, [640,480]);
//       const resized = tf.image.resizeBilinear(img, [416,416]);
//       // img = tf.image.resizeBilinear(img.expandDims().toFloat(), [416,416]);
//       // const casted = resized.cast('int32');
//       const casted = resized.cast('float32');
//       const expanded = casted.expandDims(0);
//       try{
//         // const outputs = await net.execute(img);
//         // const obj = await net.execute(expanded);
//         // const tensor = await obj.arraySync();
//         // const arrays = !Array.isArray(outputs) ? outputs.array() : Promise.all(outputs.map(t => t.array()));
//         // let predictions = await arrays;
//         // console.log(outputs);
        
        
//           // const num_anchor = ANCHORS.length / 2;
//           // const channels = predictions[0][0][0].length;
//           // const height = predictions[0].length;
//           // const width = predictions[0][0].length;

//           // const num_class = channels / num_anchor - 5;

// 		      // let boxes = [];
// 	      	// let scores = [];
// 		      // let classes = [];

//           // for (var grid_y = 0; grid_y < height; grid_y++) {
//           //   for (var grid_x = 0; grid_x < width; grid_x++) {
//           //     let offset = 0;
      
//           //     for (var i = 0; i < num_anchor; i++) {
//           //       let x = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) / width;
//           //       let y = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) / height;
//           //       let w = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width;
//           //       let h = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height;
      
//           //       let objectness = tf.scalar(_logistic(predictions[0][grid_y][grid_x][offset++]));
//           //       let class_probabilities = tf.tensor1d(predictions[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax();
//           //       offset += num_class;
      
//           //       class_probabilities = class_probabilities.mul(objectness);
//           //       let max_index = class_probabilities.argMax();
//           //       boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
//           //       scores.push(class_probabilities.max().dataSync()[0]);
//           //       classes.push(max_index.dataSync()[0]);
//           //     }
//           //   }
//           // }

//           // for(let j = 0; j < height*width; j++){
//           //   var grid_y = Math.floor(j / width);
//           //   var grid_x = j % width;
            
//           //   let offset = 0;
      
//           //     for (var i = 0; i < num_anchor; i++) {
//           //       let x = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) / width;
//           //       let y = (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) / height;
//           //       let w = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width;
//           //       let h = Math.exp(predictions[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height;
      
//           //       let objectness = tf.scalar(_logistic(predictions[0][grid_y][grid_x][offset++]));
//           //       let class_probabilities = tf.tensor1d(predictions[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax();
//           //       offset += num_class;
      
//           //       class_probabilities = class_probabilities.mul(objectness);
//           //       tf.dispose(objectness)
//           //       let max_index = class_probabilities.argMax();
//           //       boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
//           //       scores.push(class_probabilities.max().dataSync()[0]);
//           //       classes.push(max_index.dataSync()[0]);
//           //       tf.dispose(class_probabilities)
//           //     }

//           // }

//           // boxes = tf.tensor2d(boxes);
// 		      // scores = tf.tensor1d(scores);
// 		      // classes = tf.tensor1d(classes);

//           // const selected_indices = await tf.image.nonMaxSuppressionAsync(boxes, scores, 10);
// 		      // predictions = [await boxes.gather(selected_indices).array(), await scores.gather(selected_indices).array(), await classes.gather(selected_indices).array()];

//           // const selected_indices = tf.image.nonMaxSuppression(boxes, scores, 10)[1];
// 		      // predictions = [boxes.gather(selected_indices).array()[1], scores.gather(selected_indices).array()[1], classes.gather(selected_indices).array()[1]];
//           // predictions = [await boxes.gather(selected_indices).arraySync(), await scores.gather(selected_indices).arraySync(), await classes.gather(selected_indices).arraySync()];

//         let model = new cvstfjs.ObjectDetectionModel();
//         await model.loadModelAsync('https://the-lazy-chef.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');
//         // const image = document.getElementById('video');
//         const result = await model.executeAsync(expanded);
//         console.log(result);

//         // console.log(predictions);

//         let boxes = await result[0];
//         let classes = await result[2];
//         let scores = await result[1];

//         // const boxes = await obj[0];
//         // const classes = await obj[5];
//         // const scores = await obj[4];

  

//         // console.log("boxes[0]: " + boxes[0]);
//         // console.log("Classes[0][0]: " + classes[0]);
//         // console.log("Scores: "+ scores[0]);

//         // Draw mesh
//         const ctx = canvasRef.current.getContext("2d");

//         // 5. TODO - Update drawing utility
//         // drawSomething(obj, ctx)  
//         requestAnimationFrame(()=>{drawRect(boxes, classes, scores, 0.1, videoWidth, videoHeight, ctx)});

//         setIngredients(output(boxes, classes, scores, 0.1));

//         tf.dispose(img);
//         tf.dispose(resized);
//         tf.dispose(casted);
//         tf.dispose(expanded);
//         // tf.dispose(obj);
//         // tf.dispose(outputs);
//         // tf.dispose(selected_indices);
//         // tf.dispose(backend);
//         console.log(tf.memory().numTensors)
//         // tf.engine().endScope()
//       } catch(error){
//         tf.dispose(img);
//         // tf.dispose(backend);
//         tf.dispose(img);
//         tf.dispose(resized);
//         tf.dispose(casted);
//         tf.dispose(expanded);
//         // tf.engine().endScope();
//         console.log(error);
//       }
//     }
//   };

//   useEffect(()=>{runCoco()},[]);

//   return (
//     <div className="App">
//       {/* <header className="App-header"> */}
//         <h1 className="project-title">The Lazy Chef</h1>
//         <Webcam
//           ref={webcamRef}
//           videoConstraints={videoConstraints}
//           muted={true} 
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",

//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 9,
//             width: 640,
//             height: 480,
//           }}
//         />

//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zindex: 8,
//             width: 640,
//             height: 480,
//           }}
//         />
//       {/* </header> */}
//         <Recipe ing={ingredients}/>
//     </div>
//   );
// }

// function Recipe(props){
//   console.log(props.ing)
//   const [recipe, setRecipe] = React.useState("");

//   let lookup = {
//      "X = zest.": "https://www.culinaryhill.com/how-to-zest-a-lemon/",
//     "X = nothing.": "https://www.allrecipes.com/"
//   }



//   function displayInfo(e){
//     let ingredientArray = props.ing
//     console.log(ingredientArray)
//          // start tau prolog sesson
//     var session = pl.create();
//     // load recipes.pl file
//     const prolog = `
//       recipe(lemon, zest).
//       recipe(bread, nutella, breadAndNutella).
//       recipe(avocado, bread, egg, avocadoToast).
//       recipe(cheese, tortilla, quesadilla).
//       recipe(bread, cheese, egg, eggAndCheeseToast).
//       recipe(bread, egg, eggInHole).
    
//       recipe(hello, no, nothing).
//     `
//     session.consult(prolog, {
//       success:function(){
//         // query recipes.pl with list of ingredients
//         session.query("recipe("+ingredientArray.sort()+", X).", {
//           success: function(goal){
//             session.answer({
//               success: function(answer){
//                 console.log(session.format_answer(answer));
//                 // call display recipe with result of query
//                 setRecipe(session.format_answer(answer));
//               }
//             });
//           }
//         })
//       },
//       error: function(err){
//         console.log("didn't work")
//       }
//     });
//   }

//   return(
//     <>
//       <button className="search-button" onClick={displayInfo}>
//         Search
//       </button>
//       <div style={{height: 30}}></div>
//       <a className="link" target="_blank" href={lookup[recipe]} >{recipe}</a>
//     </>
//   )
// }

export default App;