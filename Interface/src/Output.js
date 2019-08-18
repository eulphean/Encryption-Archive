//[ Output Canvas                                                    ]
// width, height are the variables set when called createCanvas in p5.js
// when drawing in the canvas, we need to use those variables.
class Output {
    constructor(yPos, height) {
        this.canvas = createCanvas(displayWidth, height);
        this.canvas.position(0, yPos);  
    }

    draw() {
        circle(width/2, height/2, 50); 
    }
}