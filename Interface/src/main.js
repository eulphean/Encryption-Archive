// Desktop Layout
//[ Encryption Archive                                               ]
//[ Output Canvas                                                    ]
//[ Private Key | Key                                    Date | Time ]
//[ Text Input                                              Button   ]
var title; var output; var input;

var bgColor = 'black'; 
var fontColor = 'white'; 
var fontSize = '30px'; 
var leftPadding = '50px'; 

function setup() {
  var h = displayHeight/12; 

  // Total 12h units of height. 
  title = new Title(h); // 1h unit high
  output = new Output(h, h * 8); // 8h units high
  input = new Input(h * 9, h * 3); // 3h unit high
}

function draw() {
  // put drawing code here
  output.draw(); 
}