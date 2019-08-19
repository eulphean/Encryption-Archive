// Desktop Layout
//[ Encryption Archive                                               ]
//[ Output Canvas                                                    ]
//[ Private Key | Key                                    Date | Time ]
//[ Text Input                                              Button   ]
var title; var output; var input;

var bgColor = 'black'; 
var fontColor = 'white'; 
var fontSize = '30px'; 
var paddingHorizontal = '50px'; 
var paddingVertical = '80px';

// AES based encrypter. 
var encrypter; 

function setup() {
  var h = displayHeight/12; 

  // Total 12h units of height. 
  title = new Title(h); // 1h unit high
  output = new Output(h, h * 8); // 8h units high
  input = new Input(h * 9, h * 3, onEncrypt); // 3h unit high

  // Initialize Encryption engine. 
  encrypter = new Encrypter(); 
}

function draw() {
  // put drawing code here
  output.draw(); 
}

function onEncrypt(message) {
    // Encrypt the message that is written. 
    var out = encrypter.encrypt(message); 
    console.log('Message: ' + message); 
    console.log('Encrypted String: ' + out['char']); // Store this in the database
    console.log('Encrypted Binary: ' + out['binary']); // Print this on the screen
}