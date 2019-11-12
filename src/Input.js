//[ Private Key | Key                                    Date | Time ]
//[ Text Input                                              Button   ]
class Input {
    constructor(onEncrypt) {
        // Private key
        this.key = select('.key'); 
        // Date / Time
        this.date = select('.date');
        this.time = select('.time');
        this.updateClock(); 
        setInterval(this.updateClock.bind(this), 1000); // Call this method every 1000 second. 
        
        // // Text input using a <textarea> tag. 
        this.textInput = select('.textinput');
        this.textInput.input(this.onInput.bind(this)); 

        // Encryption button.
        this.encrypt = select('.inputbutton'); 
        this.encrypt.mousePressed(this.onClick.bind(this, onEncrypt)); 
        this.disableButton(); 
    }

    updateClock() {
        // Get current date instance.
        var now = new Date(); 
        var date = now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
        var time = now.toLocaleTimeString();
        // time = time[0] + time[1];
        this.date.html(date);
        this.time.html(time); 
    }

    setPrivateKey(key) {
        this.key.html(key); 
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
            this.key.html('');
        } else {
            this.disableButton();
        }
    }

    disableButton() {
        this.encrypt.style('color', '#cfcfcf');
        this.encrypt.attribute('disabled', true); 
        this.encrypt.removeClass('animate');
    }

    enableButton() {
        // Enable color
        this.encrypt.style('color', 'black');
        this.encrypt.removeAttribute('disabled'); 
        this.encrypt.addClass('animate');
    }
}