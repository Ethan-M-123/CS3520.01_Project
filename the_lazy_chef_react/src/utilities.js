// Define our labelmap
export const labelMap = {
    1:{name: 'almond'},
    2:{name: 'apple'},
    3:{name: 'asparagus'},
    4:{name: 'avocado'},
    5:{name: 'baby corn'},
    6:{name: 'bacon'},
    7:{name: 'bagel'},
    8:{name: 'balsamic vinegar'},
    9:{name: 'banana'},
    10:{name: 'bean'},
    11:{name: 'bell pepper'},
    12:{name: 'blackberry'},
    13:{name: 'blueberry'},
    14:{name: 'bread'},
    15:{name: 'brocolli'},
    16:{name: 'butter'},
    17:{name: 'carrot'},
    18:{name: 'cheese'},
    19:{name: 'chicken'},
    20:{name: 'chocolate'},
    21:{name: 'cookie'},
    22:{name: 'cream cheese'},
    23:{name: 'egg'},
    24:{name: 'garlic'},
    25:{name: 'green beans'},
    26:{name: 'ground beef'},
    27:{name: 'ham'},
    28:{name: 'honey'},
    29:{name: 'ice cream'},
    30:{name: 'ketchup'},
    31:{name: 'lasagna noodle'},
    32:{name: 'lettuce'},
    33:{name: 'lunch meat'},
    34:{name: 'marshmallow'},
    35:{name: 'mayonnaise'},
    36:{name: 'milk'},
    37:{name: 'mushroom'},
    38:{name: 'mustard'},
    39:{name: 'noodle'},
    40:{name: 'oatmeal'},
    41:{name: 'onion'},
    42:{name: 'potato'},
    43:{name: 'sausage'},
    44:{name: 'shredded cheese'},
    45:{name: 'strawberry'},
    46:{name: 'sugar'},
    47:{name: 'sweet potatoes'},
    48:{name: 'tomato'},
    49:{name: 'tortillas'},
    50:{name: 'yogurt'}
}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx) => {
    let signs = []
    for(let i = 0; i <= boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i];
            const text = classes[i];

            // Set styling
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 10;
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';

            signs.push(labelMap[text]['name']);
            // console.log(labelMap[text]['name']);

            // DRAW!!
            ctx.beginPath();
            ctx.fillText(labelMap[text]['name']+ ' - ' +Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10);
            // ctx.fillText("something", x*imgWidth, y*imgHeight-10);
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke();
        }
    }
    
}

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
