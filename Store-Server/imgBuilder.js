var Jimp = require('jimp'); 

// Private variables.
var newOne = '1101';
var newZero = '0010'; 
var numBufferColums = 4; 
var externalBufferHeight = 200; // Get from the website
var inbetweenBufferHeight = 10;  // Get from the website
var fullImgWidth = 3976; 
// Width we want to fit the message to (before expanding that basically multiplies the message by 4)
var fitWidth = (3976 - (numBufferColums * 2))/4;  // 992

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

    fitMessage: function(message) {
        // Original message should be received here.
        var msgLength = message.length; 
        var numsRowsNeeded = Math.ceil(msgLength / fitWidth);
        var cellsToFill = (fitWidth * numsRowsNeeded) - msgLength; 
    
        // Modify encrypted message and append last char x remainder times. 
        var newChar = message[msgLength - 1] == 1 ? 0 : 1; 
        for (var i = 0; i < cellsToFill; i++) {
            message += newChar; 
            newChar = (newChar + 1) % 2; 
        }
        return message; 
    },

    createImage: function(messages, otherParams, onImage) {
        // Browser Parameters. 
        externalBufferHeight = parseInt(otherParams.erows); 
        inbetweenBufferHeight = parseInt(otherParams.irows);
        
        console.log('Creating image buffer'); 
        createBuffer(messages);

        var imageName = 'newImage.png';
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

function createBuffer(messages) {
    startRow = 0; lastRow = externalBufferHeight; 
    externalBuffer(startRow, lastRow); 
    console.log('Num Messages Printing: ' + messages.length);

    for (var i = 0; i < messages.length; i++) {
        createMessageBuffer(messages[i]); // Create messages without in between things. 
        if (i != messages.length - 1 && inbetweenBufferHeight > 0) {
            startRow = lastRow; lastRow = startRow + inbetweenBufferHeight; 
            externalBuffer(startRow, lastRow);
        }
    }

    startRow = lastRow; lastRow = startRow + externalBufferHeight; 
    externalBuffer(startRow, lastRow);
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

        createColumnBuffer(i, fullImgWidth-numBufferColums, fullImgWidth); 
        idxTracker++; 
    }
}

function createColumnBuffer(row, start, end) {
    for (var j = start; j < end; j++) {
        if (idxTracker%2==0) {
            buffer[row][j] = black;
        } else {
            buffer[row][j] = white; 
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