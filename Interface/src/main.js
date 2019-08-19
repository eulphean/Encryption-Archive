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
  input = new Input(h * 9, h * 3); // 3h unit high

  // Initialize Encryption engine. 
  encrypter = new Encrypter(); 

  // Sample encryption.
  var out = encrypter.encrypt("Hello World"); 
  console.log(out['char']); // Store this in the database
  console.log(out['binary']); // Print this on the screen
}

function draw() {
  // put drawing code here
  output.draw(); 
}