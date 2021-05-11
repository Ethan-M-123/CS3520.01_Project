// Define our labelmap
export const labelMap = {
    1:{name: 'almond'},
    2:{name: 'apple'},
    3:{name: 'asparagus'},
    4:{name: 'avocado'},
    5:{name: 'baby corn'},
    6:{name: 'bacon'},
    7:{name: 'bagel'},
    8:{name: 'baking soda'},
    9:{name: 'balsamic vinegar'},
    10:{name: 'banana'},
    11:{name: 'bean'},
    12:{name: 'bell pepper'},
    13:{name: 'blackberry'},
    14:{name: 'blueberry'},
    15:{name: 'bread'},
    16:{name: 'brocolli'},
    17:{name: 'butter'},
    18:{name: 'carrot'},
    19:{name: 'cheese'},
    20:{name: 'chicken'},
    21:{name: 'chocolate'},
    22:{name: 'cookie'},
    23:{name: 'cream cheese'},
    24:{name: 'egg'},
    25:{name: 'flour'},
    26:{name: 'garlic'},
    27:{name: 'green beans'},
    28:{name: 'ground beef'},
    29:{name: 'ham'},
    30:{name: 'honey'},
    31:{name: 'ice cream'},
    32:{name: 'ketchup'},
    33:{name: 'lasagna noodle'},
    34:{name: 'lettuce'},
    35:{name: 'lunch meat'},
    36:{name: 'marshmallow'},
    37:{name: 'mayonnaise'},
    38:{name: 'milk'},
    39:{name: 'mushroom'},
    40:{name: 'mustard'},
    41:{name: 'noodle'},
    42:{name: 'oatmeal'},
    43:{name: 'oil'},
    44:{name: 'onion'},
    45:{name: 'sausage'},
    46:{name: 'shredded cheese'},
    47:{name: 'sugar'},
    48:{name: 'sweet potatoes'},
    49:{name: 'tomato'},
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