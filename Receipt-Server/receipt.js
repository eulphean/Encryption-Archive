var io = require('socket.io-client'); 
var localhostURL = "http://localhost:5000/receipt"
var herokuURL = "https://mysterious-shore-86207.herokuapp.com/receipt";

// Constants
var numBufferRows = 2; // It can be any number. 
var numBufferColums = 4; // It can be 2 or 4 only.
var numColsInReceipt = 48; 

var socket = io.connect(localhostURL, {
    reconnection: true, 
    reconnectionDelay: 500, 
    reconnectionAttempts: Infinity 
});

// var escpos = require('escpos');
// // Setup device and printer with the baudrate. 
// var device = new escpos.Serial('/dev/cu.Repleo-PL2303-00002014', {
//     autoOpen: true,
//     baudRate: 38400,
// });

// const printer = new escpos.Printer(device);
// Clean Printer Routine (don't mess with this)
// printer.feed(3);
// printer.flush();
// printer.flush();
// printer.cut(0, 5);
// printer.flush();

socket.on('connect', () => {
    console.log('Connected'); 
    socket.on('printPayload', onPayload);
    socket.on('time', logTime); 
})

function logTime(time) {
    console.log('Socket Connection Alive: ' + time); 
}

function onPayload (payload) {
    console.log('New Print Payload Received'); 
    var date = payload['date']; 
    var time = payload['time']; 
    var key = payload['key']; 
    var encryptedMsg = payload['binary']; 

    // Modify encrypted message to fit it in receipt. 
    encryptedMsg = fitMessageInReceipt(encryptedMsg); 

    // Printer commands to generate a receipt. 
    // device.open(function() {
    //    // Set basic styles. 
    //    generateHeader(date, time, key); 
    //    printer.drawLine(); 
    //    generateMiddle(encryptedMsg); 
    //    printer.drawLine(); 
    //    generateFooter(); 
    //    printer.cut(0, 5);
    //    printer.flush();  
    // });
}

function generateHeader(date, time, key) {
    // Defualt spacing for header section 
    printer.spacing(); 
    printer.lineSpace(); 
    printer.setReverseColors(true); 
    printer.align('ct'); 

    // ------------- Title -------------- // 

    // Font style. 
    printer.font('b');
    printer.style('bu');
    printer.size(2, 2); 

    printer.text('ENCRYPTION ARCHIVE'); 
    printer.newLine(); 

    // ------------- Date, Time, Key ---------- // 
    
    // Font style. 
    printer.setReverseColors(false); 
    printer.font('a'); 
    printer.style('b'); 
    printer.size(1, 1); 

    var t = date + ' ' + time; 
    printer.text(t);
    t = 'Private Key: ' + key; 
    printer.text(t); 
}

function generateMiddle(encryptedMsg) {
    // ------------- Title -------------- // 
    printer.setReverseColors(true); 
    printer.text('ENCRYPTED MESSAGE'); 
    printer.newLine();

    // ------------- Message -------------- // 
    printer.setReverseColors(false); 
    printer.spacing(0); 
    printer.lineSpace(0);
    printer.align('ct'); 
    printer.size(1,1);
    printMessage(encryptedMsg); 
    // Print the actual message here. How will I printer the message
    // Algorithm to print the actual message 
    // Look at the main app to see the actual algorithm. 
    printer.setReverseColors(false); 
}

function generateFooter() {
    printer.setReverseColors(true); 
    printer.spacing(); 
    printer.lineSpace(); 
    printer.font('a'); 
    printer.style('b'); 
    printer.size(1, 1); 
    printer.text('THANK YOU'); 
}

function printMessage(encryptedMsg) {
    // Format is like this
    //////////// Buffer //////////// x numBufferRows
    // Buffer // x numBufferColumns [Actual Message] // Buffer // x numBufferColumns (Message needs to be formatted in a specific format)
    //////////// Buffer //////////// x numBufferRows
    
    // Fit message in the receipt.
    // Number of characters need to be a multiple of 42

    // Top Buffer
    drawBuffer(); 
    // Message
    drawBuffer(); 
  
}

function drawBuffer() {
    for (var j = 0; j < numBufferRows; j++) {
        for (var i = 0; i < numColsInReceipt; i++) {
            if (i%2) {
                // 0 is black
                printer.setReverseColors(true); 
            } else {
                // 1 is white
                printer.setReverseColors(false);
            }
            printer.print(' '); 
        }
    }
}

function fitMessageInReceipt(encryptedMsg) {
    var msgLength = encryptedMsg.length; 
    var remainder = msgLength % (numColsInReceipt - numBufferColums * 2);
    var lastChar = encryptedMsg[msgLength - 1]; 

    // Modify encrypted message and append last char x remainder times. 
    for (var i = 0; i < remainder; i++) {
        encryptedMsg += lastChar; 
    }

    return encryptedMsg; 
}