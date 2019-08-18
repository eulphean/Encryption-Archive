//[ Private Key | Key                                    Date | Time ]
//[ Text Input                                              Button   ]
class Input {
    constructor(yPos, height) {
        this.container = createDiv(); 
        this.container.position(0, yPos);
        this.container.size(displayWidth, height); 
        this.container.style('background-color', 'black'); 
    }
}