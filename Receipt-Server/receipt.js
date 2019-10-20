var io = require('socket.io-client'); 
var localhostURL = "http://localhost:5000/receipt"
var herokuURL = "https://mysterious-shore-86207.herokuapp.com/receipt";
var socket = io.connect(herokuURL, {
    reconnection: true, 
    reconnectionDelay: 500, 
    reconnectionAttempts: Infinity 
});

var escpos = require('escpos');
// Setup device and printer with the baudrate. 
var device = new escpos.Serial('/dev/cu.Repleo-PL2303-00001014', {
    autoOpen: true,
    baudRate: 38400,
});

const printer = new escpos.Printer(device);
// Clean Printer Routine (don't mess with this)
printer.feed(3);
printer.flush();
printer.flush();
printer.cut(0, 5);
printer.flush();

socket.on('connect', () => {
    console.log('Connected'); 
    socket.on('printPayload', onPayload);
    socket.on('time_all', logTime); 
})

function logTime(time) {
    console.log('Socket Connection Alive: ' + time); 
}

function onPayload (payload) {
    console.log('New Print Payload Received')
    var a = 'Key, Binary, Date, Time: '; 
    var b = payload['key'] + ', ' + payload['binary'] + ', ' + payload['date'] + ', ' + payload['time']; 
    console.log(a + b); 

    // Print things
    // TODO: Print a receipt with that information here. 
    device.open(function() {
       printer.lineSpace(); // Default line space. 
       printer.print('Happy Birthday');
       printer.feed(3); 
       printer.setReverseColors(false); 
       printer.spacing(0); 
       printer.lineSpace(0);
       printer.align('ct'); 
       printer.style('normal');
       printer.size(1,1);
       for (var i = 0; i < 500; i++) {
           if (Math.random(1) < 0.5) {
               printer.setReverseColors(true);
               printer.text(' ');
           } else {
               printer.setReverseColors(false);
               printer.text(' ');
           }
       }
       printer.lineSpace(); // Default Line space. 
       printer.feed(3); 
       printer.cut(0, 10);
       printer.flush();  
    });
}