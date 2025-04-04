
// Initialize the color pickers
const colors = createColorPickers();
const tempColors = [];
const fillMode_Checkered = [];
let revert = true;

var inputTimer = null;

function createColorPickers() {
  const btnArray = new Array(len);
  const container = document.getElementById('colorPickerRow');
  for (let i = 0; i < len; i++) {
    const pickerDiv = document.createElement('div');
    const arrowLabels = document.createElement('div');
    const arrowLabelRight = document.createElement('span');
    const arrowLabelLeft = document.createElement('span');
    arrowLabelRight.innerHTML = '➡️';
    arrowLabelLeft.innerHTML = '⬅️';
    picker = document.createElement('input');
    picker.type = 'color';
    pickerDiv.className = 'color-picker-div';
    picker.className = 'color-picker';
    picker.value = '#ffffff';

    // Add event listener for color change
    picker.addEventListener('input', (event) => {
      executeAfterTimer(fillColors);
    });
    picker.addEventListener('change', (event) => {
      fillColors();
    });
    //event listener for double click. will be used for multiple color adds
    picker.addEventListener("dblclick", (event) => {
      alert('dblclck');
    });
    arrowLabelRight.addEventListener('click', (event) => {
      fillNextRow(event);
    });
    arrowLabelLeft.addEventListener('click', (event) => {
      fillPrevRow(event);
    });
    //dont add first element's left arrow
    if (i > 0) arrowLabels.appendChild(arrowLabelLeft);
    //dont add last element's right arrow 
    if (i < (len - 1)) arrowLabels.appendChild(arrowLabelRight);
    pickerDiv.appendChild(arrowLabels);
    pickerDiv.appendChild(picker);
    container.appendChild(pickerDiv);
    btnArray[i] = picker;
  }


  //mark the middle one
  btnArray[22].previousSibling.innerHTML = 'mid';
  btnArray[22].className = 'color-picker-mid';

  return btnArray;
}

// user clicked on the arrow, so we fill the next row with same color
/*
<div class="color-picker-div">                              <---- 0 level parent
    <div>                                                     <---- 1 level arrowLabels
        <span>⬅️</span>                                        <---- 2 level arrow --> click target
        <span>➡️</span>
    </div>
    <input type="color" class="color-picker">                 <---- 1 level
</div>

document.querySelector("#colorPickerRow > div:nth-child(21)")

*/
function fillNextRow(e) {
  const clickTarget = e.target;   //2 level
console.log('target: ', clickTarget);
  const color = clickTarget.parentElement.nextSibling.value;  //1 level next sibling
console.log('color : ', clickTarget.parentElement.nextSibling.value);
  const nextRow = clickTarget.parentElement.parentElement.nextSibling.firstChild.nextSibling; // 1 level, 0 level, next div, 1 level, next sibling
console.log('next row: ', nextRow);
  nextRow.value = (nextRow)? color : '#001133';
  fillColors();
}
function fillPrevRow(e) {
  const clickTarget = e.target;   //2 level
console.log('target: ', clickTarget);
  const color = clickTarget.parentElement.nextSibling.value;  //1 level next sibling
console.log('color : ', clickTarget.parentElement.nextSibling.value);
  const prevRow = clickTarget.parentElement.parentElement.previousSibling.firstChild.nextSibling; // 1 level, 0 level, prev div, 1 level, next sibling
console.log('next row: ', prevRow);
prevRow.value = (prevRow)? color : '#001133';
  fillColors();
}

function executeAfterTimer(redraw) {
  //timer function to delay triggering events too quickly
  if (inputTimer == null) {
    redraw();
    inputTimer = setTimeout(function () {
      inputTimer = null;

    }, 200)
  } else {
    //clearTimeout(inputTimer);
    //inputTimer = null;
    return;
  }

}

function prepareMirrored() {
  const rSlider = document.getElementById('rangeSlider');
  const rVal = document.getElementById('rangeValue');

  rVal.textContent = rSlider.value;
  rSlider.addEventListener("input", (event) => {
    rVal.textContent = event.target.value;
    fillMirrored(event.target.value);
  });
}

function fillMirrored() {
  const pivot = document.getElementById('rangeValue').value;
  const mirrorRight = document.getElementById('rbMirrorRight').checked;

  //fill temp copy of color
  // in case we want to revert to original
  if (revert) {
    for (let i = 0; i < colors.length; i++) {
      tempColors[i] = colors[i].value;
    }
    revert = false;
  }

  //fill the mirror
  let colorsToMirror = [];
  for (let i = 0; i < len; i++) {
    if (i < pivot) {
      colorsToMirror[i] = colors[i].value;
    }
    if (i > pivot) {
      //if ((i-pivot) < colorsToMirror.length){
      colors[i].value = colorsToMirror[2 * pivot - i];
      //}
    }
  }
  //finally re-fill the colors
  fillColors();
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addRectangleToSVG(color) {
  const svgCanvas = document.getElementById('svgCanvas');
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', 5);
  rect.setAttribute('height', 5);
  rect.setAttribute('fill', color);
  rect.setAttribute('x', Math.random() * (svgCanvas.clientWidth - 5)); // Random x position
  rect.setAttribute('y', Math.random() * (svgCanvas.clientHeight - 5)); // Random y position
  svgCanvas.appendChild(rect);
}

//adds event listeners to the fill mode checkered
function prepareCheckered() {
  let cpCheckered = document.getElementsByClassName('cp-check');
  for (let i = 0; i < cpCheckered.length; i++) {

    fillMode_Checkered[i] = cpCheckered[i];

    fillMode_Checkered[i].addEventListener('input', (event) => { //maybe 'change' instead of 'input'
      let id = event.target.id;
      if (id == "cp-check1" || id == "cp-check2") executeAfterTimer(function () { fillCheckered(1) });
      else executeAfterTimer(function () { fillCheckered(2) });;
    });

    fillMode_Checkered[i].addEventListener('change', (event) => { //maybe 'change' instead of 'input'
      let id = event.target.id;
      if (id == "cp-check1" || id == "cp-check2") fillCheckered(1);
      else fillCheckered(2);
    });


  }

  function fillCheckered(option) {
    //get gradient from cp1 and cp2 of checkered
    if (option == 1) {
      let steps = Math.ceil(fullList.length / 2);
      let checkeredColors = generateGradientColors(fillMode_Checkered[0].value, fillMode_Checkered[1].value, steps);
      for (let i = 0; i < colors.length; i++) {
        if (i % 2 == 0) {
          colors[i].value = checkeredColors[i / 2];
        }
      }
    }

    //get gradient from cp1 and cp2 of checkered
    if (option == 2) {
      let steps = Math.floor(fullList.length / 2);
      let checkeredColors = generateGradientColors(fillMode_Checkered[2].value, fillMode_Checkered[3].value, steps);
      for (let i = 0; i < colors.length; i++) {
        if (i % 2 != 0) {
          colors[i].value = checkeredColors[~~(i / 2)];   //integer division
        }
      }
    }

    //finally re-fill the colors
    fillColors();
  }
  function generateGradientColors(color1, color2, steps) {
    const start = hexToRgb(color1);
    const end = hexToRgb(color2);
    const gradientColors = [];

    for (let i = 0; i < steps; i++) {
      const r = Math.round(start.r + (end.r - start.r) * (i / (steps - 1)));
      const g = Math.round(start.g + (end.g - start.g) * (i / (steps - 1)));
      const b = Math.round(start.b + (end.b - start.b) * (i / (steps - 1)));
      gradientColors.push(rgbToHex(r, g, b));
    }

    return gradientColors;
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }
  function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
}