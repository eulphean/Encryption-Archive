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
    constructor() {
        // Setup canvas.
        var middle = select('#middle');
        this.canvas = createCanvas(displayWidth, middle.height);
        this.canvas.parent(middle);

        this.cells = []; 
        this.columns = width/cellSize; 
        this.rows = height/cellSize; 

        // Initialize encryption bed. 
        this.initGrid(); 

        console.log('Rows, Columns: ' + this.rows + ', ' + this.columns);
    }

    draw() {
        var timer = 0; 
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                var idx = 2*i + j; 
                setTimeout(this.drawCell.bind(this), (timer + idx) * 10, this.cells[i][j]);
            }
        }
    }

    drawCell(cell) {
        cell.draw(); 
    }

    initGrid() {
        var idx = 0; 
        console.log('Rows: ' + this.rows + 'Columns: ' + this.columns); 
        for (var i = 0; i < this.rows; i++) {
            this.cells[i] = []; // 2D array assign.
            for (var j = 0; j < this.columns; j++) {
              // Create cell. 
              var xPos = j * cellSize;
              var yPos = i * cellSize; 
              var color = (idx%2 == 0) ? black : white;
              var cell = new Cell(xPos, yPos, color);
              // Push cell. 
              this.cells[i][j] = cell;
              idx++; 
            }
            idx++; 
        }
    }

    updateCells(binaryString) {
        // Initialize . 
        this.initGrid();
        this.draw(); 

        // We leave 4 columns on either side. 
        var usableColumns = (this.columns-8); 

        // Calculate where to add fake values to the string to make it. 
        var numRowsForString = Math.ceil(binaryString.length/usableColumns); 
        var numCellsToFill = (usableColumns * numRowsForString) - binaryString.length; 
        console.log('Length, Num cells to fill: ' + binaryString.length + ', ' + numCellsToFill);
        
        // Modify string to make it cover the entire width of usable columns.  
        binaryString = this.modifyBinaryString(binaryString, numCellsToFill); 
        console.log('New String Length: ' + binaryString.length);

        // Figure out which row to start updating the cells. 
        var centerRow = Math.ceil(this.rows/2); 
        var startRow = centerRow - Math.floor(numRowsForString/2); 
        console.log('String rows, centerRow, startRow: ' + numRowsForString + ', ' + centerRow + ', ' + startRow);

        // Update and draw the cells that I want to update.
        var item = 0;  
        var timer = 0;
        for (var i = startRow; i < this.rows; i++) {
            for (var j = 4; j <= this.columns-5; j++) {
                this.cells[i][j].col = (binaryString[item] == 0) ? black : white; 
                var idx = 2*i + j; 
                setTimeout(this.drawCell.bind(this), (timer + idx) * 10, this.cells[i][j]);
                // this.cells[i][j].draw(); 
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
            startIdx = (startIdx + 1) % 2; 
        }

        return binaryString; 
    }
}