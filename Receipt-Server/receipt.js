var io = require('socket.io-client'); 
var localhostURL = "http://localhost:5000/receipt"
var herokuURL = "https://mysterious-shore-86207.herokuapp.com/receipt";

// Constants
var numBufferRows = 5; // It can be any number. 
var numBufferColums = 4; // It can be 2 or 4 only.
var numColsInReceipt = 48; 
var usableColums = numColsInReceipt - numBufferColums * 2; 

var socket = io.connect(herokuURL, {
    reconnection: true, 
    reconnectionDelay: 500, 
    reconnectionAttempts: Infinity 
}); 

var escpos = require('escpos');
// Setup device and printer with the baudrate. 
// '/dev/cu.Repleo-PL2303-00002014'

var device, printer; 
device = new escpos.Serial('/dev/ttyUSB0', {
    autoOpen: true,
    baudRate: 38400, 
});
printer = new escpos.Printer(device); 

// Clean Printer Routine (don't mess with this)
printer.feed(1);
printer.cut(0, 5);
printer.flush();

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

    console.log('Old Encrypted Msg Length: ' + encryptedMsg.length); 

    // Modify encrypted message to fit it in receipt. 
    encryptedMsg = fitMessageInReceipt(encryptedMsg); 
    console.log('New Encrypted Msg Length: ' + encryptedMsg.length); 

    try {
        // Printer commands to generate a receipt. 
        device.open(function() {
            // Set basic styles. 
            generateHeader(date, time, key); 
            printer.newLine(); 
            generateMiddle(encryptedMsg);
            generateFooter(); 
            printer.cut(0, 5);
            printer.flush();  
        });
    } catch (e) {
        console.log('Failure while printing: Check if we have run out of paper.');
        console.log(e); 
    }; 
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
    printer.style('b');
    printer.size(2, 2); 

    printer.text(' ENCRYPTION ARCHIVE '); 
    printer.size(1, 1); 
    printer.setReverseColors(false);
    printer.newLine(); 
    printer.setReverseColors(true); 
    printer.text(' www.encryptionarchive.net '); 
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
    printer.text(' ENCRYPTED MESSAGE '); 
    printer.newLine();

    // ------------- Message -------------- // 
    printer.spacing(0); 
    printer.lineSpace(0);
    printer.align('ct'); 
    printer.size(1, 0.5);
    printMessage(encryptedMsg);
    printer.setReverseColors(false);
    printer.text(' '); 
}

function generateFooter() {
    printer.setReverseColors(true); 
    printer.spacing(); // Reset to default.
    printer.lineSpace(); // Reset to default.
    printer.newLine(); 
    printer.font('a'); 
    printer.style('b'); 
    printer.size(1, 1); 
    printer.text(' DYLAN FISH '); 
}

function printMessage(encryptedMsg) {
    // Format is like this
    //////////// Buffer //////////// x numBufferRows
    // Buffer // x numBufferColumns [Actual Message] // Buffer // x numBufferColumns (Message needs to be formatted in a specific format)
    //////////// Buffer //////////// x numBufferRows

    // This keeps track of how many characters have been printed.
    // It helps in generating the pattern we want. 
    var idxTracker = 0; 
    // Top Buffer
    idxTracker = drawBuffer(idxTracker); 
    
    // In-between string. 
    var encryptedCount = numColsInReceipt - 2*numBufferColums; 
    var numRows = encryptedMsg.length / encryptedCount; 
    console.log('Receipt Rows ' + numRows); 
    var msgIdx = 0; 
    for (var i = 0; i < numRows; i++) {
        // Print start buffer
        idxTracker = drawColumBuffer(idxTracker); // 4 chars
        
        // Print actual encrypted binary characters.  
        for (var k = 0; k < usableColums; k++) { // 40 chars 
            var c = encryptedMsg[msgIdx];
            if (c==0) {
                // 0 is black
                printer.setReverseColors(true);
            } else {
                // 1 is white
                printer.setReverseColors(false);
            }
            printer.print(' '); 
            msgIdx++; 
        }

        // Print end buffer
        idxTracker = drawColumBuffer(idxTracker);  // 4 chars

        // Need to increment this to alternate the pattern for the 
        // next line. 
        idxTracker++; 
    }

    // Bottom Buffer
    idxTracker = drawBuffer(idxTracker);
}

function drawColumBuffer(idxTracker) {
    for (var j = 0; j < numBufferColums; j++) {
        if (idxTracker%2==0) {
            // 0 is black
            printer.setReverseColors(true);
        } else {
            // 1 is white
            printer.setReverseColors(false);
        }
        printer.print(' '); 
        idxTracker++; 
    }

    return idxTracker; 
}

// Same strategy that is used to create alternate pattern output on the Web app. 
// See Output.js for that. 
function drawBuffer(idxTracker) {
    for (var j = 0; j < numBufferRows; j++) {
        for (var i = 0; i < numColsInReceipt; i++) {
            if (idxTracker%2 == 0) {
                // 0 is black
                printer.setReverseColors(true); 
            } else {
                // 1 is white
                printer.setReverseColors(false);
            }
            printer.print(' '); 
            idxTracker++; 
        }
        idxTracker++; 
    }

    // Keep track of this row index. 
    return idxTracker; 
}

function fitMessageInReceipt(encryptedMsg) {
    var msgLength = encryptedMsg.length; 
    var numsRowsNeeded = Math.ceil(msgLength / usableColums);
    var cellsToFill = (usableColums * numsRowsNeeded) - msgLength
   
    // Modify encrypted message and append last char x remainder times. 
    var newChar = encryptedMsg[msgLength - 1] == 1 ? 0 : 1; 
    for (var i = 0; i < cellsToFill; i++) {
        encryptedMsg += newChar; 
        newChar = (newChar + 1) % 2; 
    }

    return encryptedMsg; 
}
