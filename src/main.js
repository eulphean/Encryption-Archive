// Desktop Layout
//[ Encryption Archive                                               ]
//[ Output Canvas                                                    ]
//[ Private Key | Key                                    Date | Time ]
//[ Text Input                                              Button   ]
var title; var output; var input;

// Global format variables
var bgColor = 'black'; 
var fontColor = 'white'; 
var fontSize = '25px'; 
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

// Socket IO
var socket; 

var localhostURL = "http://localhost:5000/app"
var herokuURL = "https://mysterious-shore-86207.herokuapp.com/app";

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
  
  
  // Connect to the socket, subscribe to events. 
  socket = io(herokuURL, { 
    reconnection: true, 
    reconnectionDelay: 500, 
    reconnectionAttempts: Infinity
  }); 
  socket.on('connect', onConnected); 
}

function draw() {
  // put drawing code here
  output.draw(); 
  noLoop();
}

function logTime(time) {
  console.log('Socket Connection Alive: ' + time); 
}

function onEncrypt(message) {
    // Encrypt the message that is written. 
    var out = encrypter.encrypt(message); 
    var charString = out['char']; 
    var binaryString = out['binary'];
    var key = out['key'];

    // Set private key in GUI
    input.setPrivateKey(key);
    
    // Emit data for the database on node server. 
    var now = new Date(); 
    var payload = {
      key: key,
      binary: binaryString, 
      date: now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate(),
      time: now.toLocaleTimeString()
    };
    
    // Send this payload to commit to the database. 
    console.log('Emitting Write Payload'); 
    socket.emit('writePayload', payload); 

    // Output set binary
    output.updateCells(binaryString); 
}

function onConnected() {
  console.log('Socket ' + socket.id + ' Connected');
  // Subscribe to other events. 
  socket.on('time', logTime); 
  socket.on('disconnect', () =>  console.log('Socket Server Disconnected.'));
}

