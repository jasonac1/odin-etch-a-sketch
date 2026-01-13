const canvas = document.querySelector(".canvas");
const CANVAS_SIZE_IN_PIXELS = 720;
let canvasCellCount = 16; 

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
}

createCanvasGrid(canvas, CANVAS_SIZE_IN_PIXELS, canvasCellCount);

