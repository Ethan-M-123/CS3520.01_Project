/**
 * Our group used Nicholas Renotte's drawRect function from a YouTube video of his.
 * We modified the function and added our own code for our specific use case.
 * Adapted from: Nicholas Renotte--"Building a Real Time Sign Language Detection App with React.JS and Tensorflow.JS | Deep Learning"
 * URL: https://youtu.be/ZTSRZt04JkY?t=2335
 * Retrieved: 5/8/2021
 */

// labelMap of ingredients
export const labelMap = {
    0:{name: 'almond'},
    1:{name: 'apple'},
    2:{name: 'asparagus'},
    3:{name: 'avocado'},
    4:{name: 'baby_corn'},
    5:{name: 'bacon'},
    6:{name: 'bagel'},
    7:{name: 'balsamic_vinegar'},
    8:{name: 'banana'},
    9:{name: 'bean'},
    10:{name: 'bell_pepper'},
    11:{name: 'blackberry'},
    12:{name: 'blueberry'},
    13:{name: 'bread'},
    14:{name: 'brocolli'},
    15:{name: 'butter'},
    16:{name: 'carrot'},
    17:{name: 'cheese'},
    18:{name: 'chicken'},
    19:{name: 'chocolate'},
    20:{name: 'cookie'},
    21:{name: 'cream_cheese'},
    22:{name: 'egg'},
    23:{name: 'garlic'},
    24:{name: 'green_beans'},
    25:{name: 'ground beef'},
    26:{name: 'ham'},
    27:{name: 'honey'},
    28:{name: 'ice_cream'},
    29:{name: 'ketchup'},
    30:{name: 'lasagna_noodle'},
    31:{name: 'lettuce'},
    32:{name: 'lunch_meat'},
    33:{name: 'marshmallow'},
    34:{name: 'mayonnaise'},
    35:{name: 'milk'},
    36:{name: 'mushroom'},
    37:{name: 'mustard'},
    38:{name: 'noodle'},
    39:{name: 'oatmeal'},
    40:{name: 'onion'},
    41:{name: 'potato'},
    42:{name: 'sausage'},
    43:{name: 'shredded_cheese'},
    44:{name: 'strawberry'},
    45:{name: 'sugar'},
    46:{name: 'sweet_potatoes'},
    47:{name: 'tomato'},
    48:{name: 'tortillas'},
    49:{name: 'yogurt'}
}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx) => {
    for(let i = 0; i <= boxes.length; i++) {
        if(boxes[i] && classes[i] && scores[i]>threshold) {
            // Extract variables
            const x = boxes[i][0];
            const y = boxes[i][1];
            const width = boxes[i][2];
            const height = boxes[i][3];
            const text = classes[i];

            // Set styling
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 10;
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';

            // DRAW!!
            ctx.beginPath();
            ctx.fillText(labelMap[text]['name']+ ' - ' +Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10);
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke();
        }
    }
    
}

// return an array of detected ingredients
export const output = (boxes, classes, scores, threshold) => {
    let signs = []
    for(let i = 0; i <= boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            const text = classes[i];
            signs.push(labelMap[text]['name']);
        }
    }
    return signs;
}