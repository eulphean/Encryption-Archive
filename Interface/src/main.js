// Desktop Layout
//[ Encryption Archive                                               ]
//[ Output Canvas                                                    ]
//[ Private Key | Key                                    Date | Time ]
//[ Text Input                                              Button   ]
var title; var output; var input;

// Global format variables
var bgColor = 'black'; 
var fontColor = 'white'; 
var fontSize = '20px'; 
var paddingHorizontal = '50px'; 
var paddingVertical = '80px';
var fontFamily = 'Menlo-Regular'; 
var defaultPrivateKeyLabel = 'Private Key | '; 

// Encryption bed variables
var cellSize = 10; 
var white; 
var black; 

// AES based encrypter. 
var encrypter; 

function setup() {
  var h = displayHeight/12; 

  // Colors
  white = color(255, 255, 255); black = color(0, 0, 0);

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
  noLoop();
}

function onEncrypt(message) {
    // Encrypt the message that is written. 
    var out = encrypter.encrypt(message); 
    var charString = out['char']; 
    var binaryString = out['binary'];
    var key = out['key'];

    input.setPrivateKey(key); 
    
    // Output set binary
    output.updateCells(binaryString); 

    // Debug Messages coming from the Encrypter. 
    // console.log('Message: ' + message); 
    // console.log('Encrypted String: ' + charString); // Store this in the database
    // console.log('Encrypted Binary: ' + binaryString); // Print this on the screen
}