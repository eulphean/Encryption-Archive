//[ Output Canvas                                                    ]
// width, height are the variables set when called createCanvas in p5.js
// when drawing in the canvas, we need to use those variables.
class Cell {
    constructor(xPos, yPos, color) {
        this.col = color; 
        this.xPos = xPos; 
        this.yPos = yPos; 
    }

    draw() {
        push();
            // Translate to the center of the cell. 
            translate(this.xPos, this.yPos);
            noStroke();
            fill(this.col);
            rect(0, 0, cellSize, cellSize); // Rather than rectangles, these will be circles actually at the center of the cell. 
        pop();
    }
}
class Output {
    constructor(yPos, height) {
        this.canvas = createCanvas(displayWidth, height);
        this.canvas.position(0, yPos);  

        this.cells = []; 
        this.columns = width/cellSize; 
        this.rows = height/cellSize; 

        // Initialize encryption bed. 
        this.initGrid(); 

        console.log('Rows, Columns: ' + this.rows + ', ' + this.columns);
    }

    draw() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                this.cells[i][j].draw();
            }
        }
    }

    initGrid() {
        var idx = 0; 
        for (var i = 0; i < this.rows; i++) {
            this.cells[i] = []; // 2D array assign.
            for (var j = 0; j < this.columns; j++) {
              // Create cell. 
              var xPos = j * cellSize;
              var yPos = i * cellSize; 
              var color = (idx%2 == 0) ? white : black;
              var cell = new Cell(xPos, yPos, color);
              // Push cell. 
              this.cells[i][j] = cell;
              idx++; 
            }
            idx++; 
        }
    }

    updateCells(binaryString) {
        // ReInit all cells and redraw them. 
        this.initGrid();
        this.draw(); 

        // We leave 4 columns on either side. 
        var usableColumns = (this.columns-8); 

        // Calculate where to add fake values to the string to make it
        var numRowsForString = Math.ceil(binaryString.length/usableColumns); 
        var numCellsToFill = (usableColumns * numRowsForString) - binaryString.length; 
        console.log('Length, Num cells to fill: ' + binaryString.length + ', ' + numCellsToFill);
        binaryString = this.modifyBinaryString(binaryString, numCellsToFill); 
        console.log('New String Length: ' + binaryString.length);

        var centerRow = Math.ceil(this.rows/2); 
        var startRow = centerRow - Math.floor(numRowsForString/2); 
        console.log('String rows, centerRow, startRow: ' + numRowsForString + ', ' + centerRow + ', ' + startRow);

        var item = 0;  
        for (var i = startRow; i < this.rows; i++) {
            for (var j = 4; j <= this.columns-5; j++) {
                this.cells[i][j].col = (binaryString[item] == 0) ? black : white; 
                this.cells[i][j].draw(); 
                item++; 
                if (item == binaryString.length) {
                    break; 
                }
            }

            if (item >= binaryString.length) {
                break; 
            }
        }
    }

    // Completes the string to the end of the usable column. 
    modifyBinaryString(binaryString, numCellsToFill) {
        var last = _.last(binaryString);
        var startIdx = (last == 1) ? 0 : 1; 
        for (var i = 0; i < numCellsToFill; i++) {
            binaryString = binaryString + startIdx; 
            // startIdx = (startIdx + 1) % 2; 
        }
        return binaryString; 
    }
}