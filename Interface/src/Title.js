//[ Encryption Archive                                               ]
class Title {
    constructor(height) {
        this.title = createDiv('Encryption Archive | Dylan Fish'); 
        this.title.position(0, 0);
        this.title.size(displayWidth, height);
        this.title.style('display', 'flex');
        this.title.style('background-color', bgColor);
        this.title.style('text-align', 'left');
        this.title.style('font-size', fontSize);
        this.title.style('font-family', 'Menlo-Regular');
        this.title.style('color', fontColor);
        this.title.style('align-items', 'center');
        this.title.style('overflow', 'hidden');
        this.title.style('padding-left', paddingHorizontal); 
        this.title.style('box-sizing', 'border-box'); 
    }
}