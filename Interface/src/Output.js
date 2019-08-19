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
}