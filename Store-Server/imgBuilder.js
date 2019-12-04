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

    for (var i = 0; i < messages.length; i++) {
        // Create the buffer just for a single message. 
        createMessageBuffer(messages[i]);

        // This is locked to 6 right now to ensure a stable weave. 
        // This is in-between buffer each message. 
        if (i != messages.length - 1) {
            startRow = lastRow; lastRow = startRow + inbetweenBufferHeight; 
            externalBuffer(startRow, lastRow);
        }
    }

    // Outer buffer. 
    startRow = lastRow; lastRow = startRow + externalBufferHeight; 
    externalBuffer(startRow, lastRow);

    console.log(buffer);
}

function createMessageBuffer(message) {
    var printableColumns = fullImgWidth - 2*numBufferColums; 
    var numRows = Math.ceil(message.length / printableColumns); // Number of rows to print this message. 
    startRow = lastRow; lastRow = startRow + numRows;

    var msgIdx = 0;
    for (var i = startRow; i < lastRow; i++) {
        buffer[i] = []; 

        // Print left column buffer. 
        colIdx = createColumnBuffer(i, 0, numBufferColums);
        
        // Create buffer based on message characters. 
        var bufIdx = 4; 
        for (var k = 0; k < message.length; k++) { // 40 chars  
            var c = message[msgIdx]; 
            if (c==0) {
                buffer[i][bufIdx] = black; 
            } else {
                buffer[i][bufIdx] = white;
            }
            
            bufIdx++; 
            msgIdx++; 
        }
        
        // Create right column buffer. 
        colIdx = createColumnBuffer(i, fullImgWidth-numBufferColums, fullImgWidth); 
        idxTracker++; 
    }
}

function createColumnBuffer(row, start, end) {
    var idx; 
    for (idx = start; idx < end; idx++) {
        if (idxTracker%2==0) {
            buffer[row][idx] = black;
        } else {
            buffer[row][idx] = white; 
        }
        idxTracker++; 
    } 
    return idx; 
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


// createWeaveString: function(expandedMessages, iBuffer) {
//     // iBuffer is a # like 4, 6, 8, 10, or 16
//     // Create an inbetween buffer with it. 
//     var inbetweenBuffer = ''; 
//     var newChar = 1; 
//     for (var i in iBuffer) {
//         inbetweenBuffer += newChar; 
//         newChar = (newChar+1) % 2; 
//     }

//     var weaveMessageString = '';
//     for (var i = 0; i < expandedMessages.length; i++) {
//         weaveMessageString += expandedMessages[i]; 
//         if (i != expandedMessages.length-1) {
//             weaveMessageString += inbetweenBuffer; 
//         }
//     }

//     var weaveString = fitString(weaveMessageString); 
//     console.log('Weave String Created: ' + weaveString.length); 
//     return weaveString; 
// }, 


// createImage: function(weaveString, externalRows, onImage) {
//     // Browser Parameters. 
//     externalBufferHeight = parseInt(externalRows); 
    
//     console.log('Creating image buffer'); 
//     createBuffer(weaveString);

//     var imageName = 'newImage.png';
//     var image = new Jimp(fullImgWidth, lastRow, (err, img) => {
//         if (err) throw err;

//         // Set data from the imgBuffer to each pixel. 
//         buffer.forEach((row, y) => {
//                 row.forEach((color, x) => {
//                 img.setPixelColor(color, x, y);
//             });
//         });

//         // Transmit image to the web browser (via Socket emit) so it can be dowloaded on the browser. 
//         img.getBase64(Jimp.MIME_PNG, function(err, result) {
//             if (err) throw err; 
//             onImage(result); 
//         });

//         console.log('Success: Image Created'); 
//         console.log('Image Parameters: Width, Height, External Rows, Internal Rows: ' + 
//         fullImgWidth + ', ' + lastRow + ', ' + externalBufferHeight + ', ' + inbetweenBufferHeight);
//     });
// }

// function createWeaveBuffer(weaveString) {
//     var numMsgColumns = fullImgWidth - 2*numBufferColums; 
//     var numMsgRows = weaveString.length / numMsgColumns;

//     startRow = lastRow; lastRow = startRow + numMsgRows; 
    
//     // Keeps track of what 1D value I'm accessing. 
//     var weaveIdx = 0; 
//     for (var i = startRow; i < lastRow; i++) {
//         buffer[i] = []; 
//         // 1st 4 columns. 
//         createColumnBuffer(i, 0, numBufferColums);
        
//         var bufIdx = 4; 
//         for (var j = 0; j < numMsgColumns; j++) {
//             var element = weaveString[weaveIdx]; 
//             if (element==0) {
//                 buffer[i][bufIdx] = black; 
//             } else {
//                 buffer[i][bufIdx] = white;
//             }
//             // Keep track of current weave's index. 
//             weaveIdx++; 
//             bufIdx++; 
//         }

//         createColumnBuffer(i, fullImgWidth-numBufferColums, fullImgWidth); 
//         idxTracker++; 
//     }
// }