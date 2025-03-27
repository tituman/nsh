function createColorPickers() {
    const btnArray = new Array(45); //TODO: add global constant here!
    const container = document.getElementById('colorPickerRow');
    for (let i = 0; i < btnArray.length; i++) {
      const picker = document.createElement('input');
      picker.type = 'color';
      picker.className = 'color-picker';
      picker.value = '#ffffff';//getRandomColor();
      
      // Add event listener for color change
      picker.addEventListener('input', (event) => {
        drawShawl();
      });

      container.appendChild(picker);
      btnArray[i] = picker;
    }
    return btnArray;
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

  // Initialize the color pickers
  const colors = createColorPickers();

function  prepareCheckered(){
  let cpCheckered = document.getElementsByClassName('cp-check');
  for (let i = 0; i < cpCheckered.length; i++) {
    const  = cpCheckered[i];
    
  }
  console.log(cpCheckered);
}