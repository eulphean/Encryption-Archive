var button; 

var oscPort = new osc.WebSocketPort({
  url: "ws://localhost:8081", // URL to your Web Socket server.
  metadata: true
});

// Events
oscPort.on("ready", function () {
  console.log("OSC port initialized. ");
});

function setup() {
  // put setup code here
  button = createButton('Send OSC');
  button.position(100, 200);
  button.size(100, 50); 
  button.mousePressed(sendOSC); 

  // Open the port for communication. 
  oscPort.open();
}

function draw() {
  // put drawing code here
}

function sendOSC() {
  const dataToSend = "Hello"; 
  
  // Send data. 
  oscPort.send({
      address: "/data",
      args: [
          {
              type: "s",
              value: dataToSend
          }
      ]
  });

  console.log("Sent OSC message to OF"); 
}
