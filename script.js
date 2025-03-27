const svgns = "http://www.w3.org/2000/svg";
const svg = document.getElementById('svg');

const zeroOffsetX = 10;
const zeroOffsetY = 10;
const scale = 5;

const rectList = [10, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2, 1];
const fullList = generateFullList(rectList);

let len = fullList.length;
//let index = 0;

// let width = rectList[index];
// //console.log(index);
// addRect(posX, posY, width, rectList[0]);
// posX += width;
// index++;

// width = rectList[index];
// console.log(index);
// addRect(posX, posY, width, rectList[0]);
// posX += width;

// for (let i = 1; i < col; i++) {



//     //special handling of index to mirror rectList
//     if ((i) % rectLLenght == 0) { incr = !incr; } //toggle increment or decrement 
//     index = incr ? ++index : --index;               // incr or decrement depending on var

//     width = rectList[index];
//     console.log(index);
//     addRect(posX, posY, width, rectList[0]);
//     posX += width;



// }
/*

We will build the rectangles according to how we will crochet the shawl.
The rows are diagonal.
This will also make colouring the inside easier ;-)

[1] [2] [3] [4] ...
[2] [3] [4] 
[3] [4] 
[4]
.
.
.

*/



let posX, posY;     // pos of rect
let x, y;           // indices of width and length of rect froom the full List
let col = getRandomColor();
let cumX = zeroOffsetX;
for (let i = 0; i < len; i++) {
    x = i;
    posX = cumX;
    posY = zeroOffsetY;
    cumX += fullList[x];
    for (let y = 0; y <= i; y++) {
        //normal case, make rect
        if (i < len-1) {
            addRect(posX, posY, fullList[x], fullList[y], col);
        } else {
        //last case, make triag
            addTriangle(posX, posY, fullList[x], fullList[y], col);
        }
        posX -= fullList[x - 1];
        posY += fullList[y];
        x--;

    }
    col = getRandomColor();

}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Example usage:
  console.log(getRandomColor());

function generateFullList(simpleList) {
    /*
    simple example:
    simple array: [a,b,c,d,e], size/length is 5

    what we want is the following kind of mirroring
    index:          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    fullArray:      [a, b, c, d, e, d, c, b, a, b, c,   d,  e,  d,  c,  b,  a]
    point of inv:                ^           ^              ^               

    the point of inversion/mirror is at 4, 8, 12, so even though the length is 5, 
    the "cycle" of mirroring is length  -1 !!!

    the first case is an anomaly, so we deal with it extra. 
    The last case (index 16) is also just a half rectngle, so we should also 
    handle it separately
    */

    let len = simpleList.length - 1;
    let size = (len) * 4;               // our full list is the simple list 4 times 
    let fullList = new Array(size+1);   // we will include the last triangle, which is an anomaly
    let i = 0;

    //handle first element anomaly
    fullList[i] = simpleList[i];

    let index = 1;
    let incr = true;
    for (i = 1; i <= size; i++) {
        fullList[i] = simpleList[index];

        //special handling of index to mirror rectList
        if ((i) % len == 0) { incr = !incr; } //toggle increment or decrement 
        index = incr ? ++index : --index;               // incr or decrement depending on var
    }
    return fullList;
}

function addRect(x, y, width, height, color) {
    myRect = document.createElementNS(svgns, 'rect');
    myRect.setAttributeNS(null, 'width', `${width}`);
    myRect.setAttributeNS(null, 'height', `${height}`);
    myRect.setAttributeNS(null, 'x', `${x}`);
    myRect.setAttributeNS(null, 'y', `${y}`);
    myRect.setAttributeNS(null, 'stroke', "black");
    myRect.setAttributeNS(null, 'stroke-width', 0.25);
    myRect.setAttributeNS(null, 'vector-effect', "non-scaling-stroke");
    myRect.setAttributeNS(null, 'transform', `scale(${scale}, ${scale})`);
    myRect.setAttributeNS(null, 'fill', color);
    myRect.setAttributeNS(null, 'rx', 1);
    svg.appendChild(myRect);
    return myRect;
}

function addTriangle(x, y, width, height, color) {
    myTri = document.createElementNS(svgns, 'polygon');
    myTri.setAttributeNS(null, 'points', `${x},${y} ${x+width},${y} ${x},${y+height}`);
    myTri.setAttributeNS(null, 'stroke', "black");
    myTri.setAttributeNS(null, 'stroke-width', 0.25);
    myTri.setAttributeNS(null, 'vector-effect', "non-scaling-stroke");
    myTri.setAttributeNS(null, 'transform', `scale(${scale}, ${scale})`);
    myTri.setAttributeNS(null, 'fill', color);
    svg.appendChild(myTri);
    return myTri;
}