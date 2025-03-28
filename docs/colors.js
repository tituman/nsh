function createColorPickers() {
  const btnArray = new Array(fullList.length);
  const container = document.getElementById('colorPickerRow');
  for (let i = 0; i < btnArray.length; i++) {
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.className = 'color-picker';
    picker.value = '#ffffff';

    // Add event listener for color change
    picker.addEventListener('input', (event) => {
      //timer function to delay triggering events too quickly
      //set a timer and if double click happens, delete the turtle
      if (inputTimer == null) {
        inputTimer = setTimeout(function () {
          inputTimer = null;
          drawShawl();

        }, 200)
      } else {
        clearTimeout(inputTimer);
        inputTimer = null;
        return;
      }

    });
    picker.addEventListener('change', (event) => {
      drawShawl();
    });

    container.appendChild(picker);
    btnArray[i] = picker;
  }

  //mark the middle one
  btnArray[22].className = 'color-picker-mid';

  return btnArray;
}


var inputTimer = null;



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

// Initialize the color pickers
const colors = createColorPickers();
const fillMode_Checkered = [];

function prepareCheckered() {
  let cpCheckered = document.getElementsByClassName('cp-check');
  for (let i = 0; i < cpCheckered.length; i++) {

    fillMode_Checkered[i] = cpCheckered[i];
    fillMode_Checkered[i].addEventListener('change', (event) => { //maybe 'change' instead of 'input'
      let id = event.target.id;
      console.log("id: ", id);
      if (id == "cp-check1" || id == "cp-check2") fillCheckered(1);
      else fillCheckered(2);
    });
    console.log(fillMode_Checkered[i].id);
  }
  function fillCheckered(option) {
    //get gradient from cp1 and cp2 of checkered
    //alert("bli");
    if (option == 1) {
      let steps = Math.ceil(fullList.length / 2);
      let checkeredColors = generateGradientColors(fillMode_Checkered[0].value, fillMode_Checkered[1].value, steps);
      for (let i = 0; i < colors.length; i++) {
        if (i % 2 == 0) {
          colors[i].value = checkeredColors[i / 2];
        }
      }
    }
    if (option == 2) {
      let steps = Math.floor(fullList.length / 2);
      let checkeredColors = generateGradientColors(fillMode_Checkered[2].value, fillMode_Checkered[3].value, steps);
      for (let i = 0; i < colors.length; i++) {
        if (i % 2 != 0) {
          colors[i].value = checkeredColors[~~(i / 2)];   //integer division
        }
      }
    }

    drawShawl();
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