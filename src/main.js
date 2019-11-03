// Desktop Layout
//[ Encryption Archive                                               ]
//[ Output Canvas                                                    ]
//[ Private Key | Key                                    Date | Time ]
//[ Text Input                                              Button   ]
var title; var output; var input;
var modal; 

// Encryption bed variables
var cellSize = 9; 
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

  initModal();

  // Colors
  white = color(255, 255, 255); black = color(0, 0, 0);

  // Total 12h units of height. 
  title = new Title(); // 1h unit high
  output = new Output(); // 8h units high
  input = new Input(onEncrypt); // 3h unit high

  // Initialize Encryption engine. 
  encrypter = new Encrypter();
  
  // Connect to the socket, subscribe to events. 
  socket = io(localhostURL, { 
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

function showModal() {
  modal.open();
}

function initModal() {
  // New modal. 
  modal = new tingle.modal({
      footer: true,
      stickyFooter: true
  });

  /// Append dom elements that I want to show. 
  // var tz = document.getElementsByClassName('tooltipTz')[0].outerHTML; 
  // var clock = document.getElementsByClassName('tooltipClock')[0].outerHTML; 
  // var caption = document.getElementsByClassName('tooltipCaption')[0].outerHTML; 
  modal.setContent('<div>Static Description Text about the project from Dylan</div');

  // // add a button
  modal.addFooterBtn('OK', 'tingle-btn tingle-btn--primary', ()=> {
      // here goes some logic
      modal.close();
  });
}