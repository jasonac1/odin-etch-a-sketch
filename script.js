const canvas = document.querySelector(".canvas");
const CANVAS_SIZE_IN_PIXELS = 720;
let canvasCellCount = 16; 
let strokeOpacity = 1;

const buttonsContainer = document.querySelector(".buttons");
const createNewCanvasButton = document.querySelector(".button-new-canvas");
const toggleRandomizeColorButton = document.querySelector(".button-toggle-randomize-color");
const opacitySlider = document.querySelector(".input-opacity");
const opacityLabel = document.querySelector(".label-opacity");

canvas.style.height = `${CANVAS_SIZE_IN_PIXELS}px`;
canvas.style.width = `${CANVAS_SIZE_IN_PIXELS}px`;
buttonsContainer.style.width = `${CANVAS_SIZE_IN_PIXELS}px`;

let inDrawMode = false; 

// terminology: 
// pixel = px (on your screen)
// cell = square div inside canvas

function createCanvasGrid(canvas, canvasSizeInPixels, canvasCellCount) {
    const cellSizeInPixels = canvasSizeInPixels / canvasCellCount;    
  
    for(let i = 0; i < canvasCellCount; i++) {
        let rowCell = document.createElement("div");
        rowCell.classList.add("row"); // for the general styling .row
        rowCell.classList.add(`row${i+1}`); // for individual .row1, .row2, etc.

        for(let j = 0; j < canvasCellCount; j++) {
            let columnCell = document.createElement("div");
            columnCell.classList.add("cell");
            columnCell.classList.add(`column${j+1}`);
            columnCell.style.cssText =  `
                                        height: ${cellSizeInPixels}px;
                                        width: ${cellSizeInPixels}px;
                                        `
            rowCell.appendChild(columnCell);
        }
        
        canvas.appendChild(rowCell);
    }

    function addCellHoverEffect(cells) {
        cells.forEach(cell => {
            cell.addEventListener("mousemove", (event) => {
                if(!inDrawMode) return;

                let cell = event.target;

                // if bg opacity is not 100% it returns rgba(w, x, y, z) else rgb(x, y, z)     
                const cellBackgroundColorStyle = window.getComputedStyle(cell)
                .getPropertyValue("background-color");

                const cellRGBValues = cellBackgroundColorStyle
                .slice(cellBackgroundColorStyle
                .indexOf("(") + 1, cellBackgroundColorStyle
                .indexOf(")"))
                .split(", ");
                
                // get cell opacity from computed value and then adds stroke opacity to it
                // (darkening)
                let cellOpacity = 0;
                if(cellRGBValues.length === 3) cellOpacity = 1; // rgb
                else if(cellRGBValues.length === 4) cellOpacity = +cellRGBValues[3]; //rgbA grab 
                // Alpha
                
                cellOpacity += strokeOpacity;
                if (cellOpacity > 1) cellOpacity = 1; // so it doesnt go over 1

                if(toggleRandomizeColorButton.classList.contains("randomize-color-on")) {
                    cell.style.background = 
                    `
                    rgb(${random(256)} ${random(256)} ${random(256)} / ${(cellOpacity * 100)}%)
                    `;
                }

                else {
                    cell.style.background = `rgb(0 0 0 / ${cellOpacity * 100}%)`; 
                }
            });
        });
    }

    let cells = document.querySelectorAll(".cell");
    addCellHoverEffect(cells);
}

createCanvasGrid(canvas, CANVAS_SIZE_IN_PIXELS, canvasCellCount);

function deleteCanvasGrid(canvas) {
    while(canvas.lastElementChild) {
        canvas.removeChild(canvas.lastElementChild);
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}

createNewCanvasButton.addEventListener("click", () => {
    canvasCellCount = +prompt("Enter new canvas size (e.g: 3)");
    if(isNaN(canvasCellCount)) {
        canvasCellCount = 16;
        alert("Invalid input! Used default of 16");
    }

    if(canvasCellCount > 100) {
        canvasCellCount = 100;
        alert("Can't set to more than 100!");
    }

    canvasCellCount = Math.floor(canvasCellCount);

    deleteCanvasGrid(canvas);
    createCanvasGrid(canvas, CANVAS_SIZE_IN_PIXELS, canvasCellCount);
});

toggleRandomizeColorButton.addEventListener("click", (event) => {
    let toggleRandomizeColorButton = event.target;

    if(toggleRandomizeColorButton.classList.contains("randomize-color-off")) {
        toggleRandomizeColorButton.textContent = "Toggle off randomize color"; 
    } else {
        toggleRandomizeColorButton.textContent = "Toggle on randomize color"; 
    }

    toggleRandomizeColorButton.classList.toggle("randomize-color-on");
    toggleRandomizeColorButton.classList.toggle("randomize-color-off");
});

opacitySlider.addEventListener("input", (event) => {
    let opacitySlider = event.target;

    strokeOpacity = +opacitySlider.value;

    // floor to fix floating point issues
    opacityLabel.textContent = `Opacity: ${Math.floor(strokeOpacity * 100)}%`;
});

document.addEventListener("mousedown", () => inDrawMode = true);
document.addEventListener("mouseup", () => inDrawMode = false);
document.addEventListener("dragstart", (event) => event.preventDefault());