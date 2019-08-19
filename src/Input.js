//[ Private Key | Key                                    Date | Time ]
//[ Text Input                                              Button   ]
class Input {
    constructor(yPos, height, onEncrypt) {
        this.container = createDiv(); 
        this.container.position(0, yPos);
        this.container.size(displayWidth, height); 
        this.container.style('background-color', 'black'); 
        this.container.style('font-size', fontSize);
        this.container.style('color', fontColor);
        this.container.style('font-family', fontFamily);
        this.container.style('box-sizing', 'border-box');

        // Local width, height variables to setup child divs in output container. 
        var w = displayWidth/4; var h = height/4; 

        // Container for private key, date and time
        this.outputContainer = createDiv(); 
        this.outputContainer.parent(this.container); 
        this.outputContainer.size(displayWidth, h); 
        this.outputContainer.style('display', 'flex');

        // Private key container

        this.label = createDiv(defaultPrivateKeyLabel); 
        this.label.parent(this.outputContainer);
        this.label.size(3*w, h); 
        this.label.style('display', 'flex');
        this.label.style('align-items', 'center');
        this.label.style('margin-left', paddingHorizontal);

        // Date and Time container
        this.dateTime = createDiv();
        this.dateTime.parent(this.outputContainer);
        this.dateTime.style('display', 'flex');
        this.dateTime.style('align-items', 'center');
        this.dateTime.style('justify-content', 'center');
        this.dateTime.size(w, h);
        this.updateClock(); 
        setInterval(this.updateClock.bind(this), 1000); // Call this method every 1000 second. 

        // Container for text input and button
        var newH = height - height/4; 
        this.inputContainer = createDiv(); 
        this.inputContainer.parent(this.container); 
        this.inputContainer.style('display', 'flex');
        this.inputContainer.size(displayWidth, newH); 
        
        // Text input using a <textarea> tag. 
        this.textInput = createElement('textarea');
        this.textInput.parent(this.inputContainer); 
        this.textInput.attribute('placeholder', 'Type Something...');
        this.textInput.input(this.onInput.bind(this)); 
        var tiWidth = 3*w+'px';
        this.textInput.style('width', tiWidth);
        this.textInput.style('display', 'flex');
        this.textInput.style('align-items', 'center');
        this.textInput.style('font-size', fontSize); 
        this.textInput.style('font-family', fontFamily);
        this.textInput.style('padding-left', paddingHorizontal); 
        this.textInput.style('padding-right', paddingHorizontal); 
        this.textInput.style('padding-top', paddingVertical);
        this.textInput.style('padding-bottom', paddingVertical);

        // Encrypt button
        this.encrypt = createButton('ENCRYPT'); 
        this.encrypt.mousePressed(this.onClick.bind(this, onEncrypt));
        this.encrypt.parent(this.inputContainer); 
        var butWidth = w+'px';
        this.encrypt.style('width', butWidth);
        this.encrypt.style('background', 'linear-gradient(90deg, rgba(179,179,179,1) 12%, rgba(255,254,254,1) 100%');
        this.encrypt.style('background-color', '#ddd');
        this.encrypt.style('font-familty', fontFamily);
        this.encrypt.style('font-size', fontSize);
        this.disableButton(); 
    }

    updateClock() {
        // Get current date instance.
        var now = new Date(); 
        var date = now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
        var time = now.toLocaleTimeString();
        this.dateTime.html(date + ' | ' + time);
    }

    setPrivateKey(key) {
        var label = defaultPrivateKeyLabel + key; 
        this.label.html(label); 
    }

    onClick(onEncrypt) {  
        // Save text input value      
        var inputText = this.textInput.value(); 

        // Reset text area, button and private key label
        this.textInput.value(''); 
        this.disableButton();

        // Callback to encrypt saved text input. 
        onEncrypt(inputText); 
    }

    onInput() {
        var inputText = this.textInput.value(); 
        if (inputText.length > 0) {
            this.enableButton(); 
            this.label.html(defaultPrivateKeyLabel); 
        } else {
            this.disableButton();
        }
    }

    disableButton() {
        this.encrypt.style('font-color', '#cfcfcf');
        this.encrypt.attribute('disabled', true); 
    }

    enableButton() {
        // Enable color
        this.encrypt.style('font-color', fontColor);
        this.encrypt.removeAttribute('disabled'); 
    }
}