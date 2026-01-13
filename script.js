const canvas = document.querySelector(".canvas");
const CANVAS_SIZE_IN_PIXELS = 720;
let canvasCellCount = 16; 

const createNewCanvasButton = document.querySelector(".button-new-canvas");

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
            cell.addEventListener("mouseenter", (event) => {
                cell.style.backgroundColor = "black"; 
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

createNewCanvasButton.addEventListener("click", () => {
    canvasCellCount = +prompt("Enter new canvas size (e.g: 3)");
    if(isNaN(canvasCellCount)) {
        canvasCellCount = 16;
        alert("Invalid input! Used default of 16");
    }

    canvasCellCount = Math.floor(canvasCellCount);

    deleteCanvasGrid(canvas);
    createCanvasGrid(canvas, CANVAS_SIZE_IN_PIXELS, canvasCellCount);
});