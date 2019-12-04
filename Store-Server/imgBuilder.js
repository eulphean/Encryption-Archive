var Jimp = require('jimp'); 

// Private variables.
var newOne = '1101';
var newZero = '0010'; 
var numBufferColums = 4; 
var externalBufferHeight = 200; // Get from the website
var inbetweenBufferHeight = 6;  // Get from the website
var fullImgWidth = 3984; 

// Buffer related variables. 
var buffer = []; 
var idxTracker = 0; 
var startRow, lastRow = 0;

// Colors
var white = 0xFFFFFFFF; 
var black = 0x000000FF;
var red = 0xFF0000FF;
var green = 0x00FF00FF; 

var wheat = 0xFFFF00FF;
var sheat = 0x00FFFFFF; 

module.exports = {
    expandMessage: function(message) {
        var newMsg = ''; // Construct a brand new message
        for (var i = 0; i < message.length; i++) {
          if (message[i] === '0') {
            newMsg = newMsg + newZero;
          } else if (message[i] === '1') {
            newMsg = newMsg + newOne; 
          }
        }
        return newMsg; 
    },

    fitString: function(weaveString) {
        var length = weaveString.length; 
        // We fit the message before it is expanded with the new format. 
        var usableWidth = (fullImgWidth-2*numBufferColums)/4; 
    
        var numsRowsNeeded = Math.ceil(length / usableWidth);
        var cellsToFill = (usableWidth * numsRowsNeeded) - length; 
    
        // Modify encrypted message and append last char x remainder times. 
        var newChar = weaveString[length - 1] == 1 ? 0 : 1; 
        for (var i = 0; i < cellsToFill; i++) {
            weaveString += newChar; 
            newChar = (newChar + 1) % 2; 
        }
        return weaveString; 
    },

    createImage: function(messages, externalRows, onImage) {
         // Browser Parameters. 
        externalBufferHeight = parseInt(externalRows);  

         console.log('Create the complete image buffer.'); 
         createWeaveBuffer(messages);
 
         var image = new Jimp(fullImgWidth, lastRow, (err, img) => {
             if (err) throw err;
 
             // Set data from the imgBuffer to each pixel. 
             buffer.forEach((row, y) => {
                     row.forEach((color, x) => {
                     img.setPixelColor(color, x, y);
                 });
             });
 
             // Transmit image to the web browser (via Socket emit) so it can be dowloaded on the browser. 
             img.getBase64(Jimp.MIME_PNG, function(err, result) {
                 if (err) throw err; 
                 onImage(result); 
             });
 
             console.log('Success: Image Created'); 
             console.log('Image Parameters: Width, Height, External Rows, Internal Rows: ' + 
             fullImgWidth + ', ' + lastRow + ', ' + externalBufferHeight + ', ' + inbetweenBufferHeight);
         });
    }
};

function createWeaveBuffer(messages) {
    // Outer buffer.  
    startRow = 0; lastRow = externalBufferHeight; 
    externalBuffer(startRow, lastRow); 

    console.log("Num messages: " + messages.length);

    for (var i = 0; i < messages.length; i++) {
        // Create the buffer just for a single message. 
        createMessageBuffer(messages[i]);
        
        // Draw a 6-row buffer after each message, except after the last one. 
        if (i < messages.length - 1) {
            startRow = lastRow; lastRow = lastRow + inbetweenBufferHeight; 
            inbetweenBuffer(startRow, lastRow);
        }
    }

    // Outer buffer. 
    startRow = lastRow; lastRow = startRow + externalBufferHeight; 
    externalBuffer(startRow, lastRow);
}

function createMessageBuffer(message) {
    var printableColumns = fullImgWidth - 2*numBufferColums; 
    var numMsgRows = Math.ceil(message.length / printableColumns); // Number of rows to print this message. 
    startRow = lastRow; 

    // Formula to calcuate the total number of rows for a message
    // y = 4x - 3 (where x is numMsgRows, y is numRowsWithBuffer)
    var numRowsWithBuffer = 4*numMsgRows - 3; 
    lastRow = startRow + numRowsWithBuffer;

    var msgIdx = 0;
    var msgRow = 0; 
    for (var i = startRow; i < lastRow; i++) {
        // Create a new row. 
        buffer[i] = []; 

        // Time to print the message. 
        if (msgRow % 4 == 0) {
            // Create left column buffer. 
            createColumnBuffer(i, 0, numBufferColums);
            
            // Column starts at this index. 
            var colIdx = 4; 
            for (var k = 0; k < printableColumns; k++) { // 40 chars  
                var c = message[msgIdx]; 
                if (c==0) {
                    buffer[i][colIdx] = black; 
                } else {
                    buffer[i][colIdx] = white;
                }
                msgIdx++; 
                colIdx++; 
            }
            
            // Create right column buffer. 
            createColumnBuffer(i, fullImgWidth-numBufferColums, fullImgWidth); 
            idxTracker++; 
        } else {
            // Print the buffer. 
            semiBetweenBuffer(i, i+1); 
        }
        msgRow++; 
    }
}

function createColumnBuffer(row, start, end) { 
    for (var idx = start; idx < end; idx++) {
        if (idxTracker%2==0) {
            buffer[row][idx] = black;
        } else {
            buffer[row][idx] = white; 
        }
        idxTracker++; 
    } 
}

function externalBuffer(startRow, lastRow) {
    for (var i = startRow; i < lastRow; i++) {
        buffer[i] = []; 
        for (var j = 0; j < fullImgWidth; j++) {
            if (idxTracker%2 == 0) {
                buffer[i][j] = black; 
            } else {
                buffer[i][j] = white;
            }
            idxTracker++; 
        }
        idxTracker++; 
    }
}

// Buffer between message. 
function inbetweenBuffer(startRow, lastRow) {
    for (var i = startRow; i < lastRow; i++) {
        buffer[i] = []; 
        for (var j = 0; j < fullImgWidth; j++) {
            if (idxTracker%2 == 0) {
                buffer[i][j] = black; 
            } else {
                buffer[i][j] = white;
            }
            idxTracker++; 
        }
        idxTracker++; 
    }
}

// Buffer between each line of the message. 
function semiBetweenBuffer(startRow, lastRow) {
    for (var i = startRow; i < lastRow; i++) {
        buffer[i] = []; 
        for (var j = 0; j < fullImgWidth; j++) {
            if (idxTracker%2 == 0) {
                buffer[i][j] = black; 
            } else {
                buffer[i][j] = white;
            }
            idxTracker++; 
        }
        idxTracker++; 
    }
}