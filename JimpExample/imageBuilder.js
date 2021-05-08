var Jimp = require('jimp'); 
var imageWidth = 500; // num columns in the image
var sideWidth = 4; 
var idxTracker = 0; 
var externalBufferRows = 50; 
var white = 0xFFFFFFFF; 
var black = 0x000000FF;

// I have all the entries till here
// Top buffer

var imgBuffer = createBuffer(externalBufferRows, idxTracker); 

var image = new Jimp(imageWidth, externalBufferRows, (err, img) => {
  if (err) throw err;

  // Set data from the imgBuffer to each pixel. 
  imgBuffer.forEach((row, y) => {
    row.forEach((color, x) => {
      img.setPixelColor(color, x, y);
    });
  });
  img.write('new.png');
}); 

// Create a buffer.
function createBuffer(numRows, idxTracker) {
  var buffer = []; 
  for (var i = 0; i < numRows; i++) {
    buffer[i] = []; 
    for (var j = 0; j < imageWidth; j++) {
      if (idxTracker%2 == 0) {
        buffer[i][j] = black; 
      } else {
        buffer[i][j] = white;
      }
      idxTracker++; 
    }
    idxTracker++; 
  }
  return buffer; 
}


// Create buffer then 


// Image Dimensions. 
// Image Width = 3976 bytes
// Start buffer (create this) // Custom height
// [Side Buffer]Content[Side Buffer]
// In-Between buffer (create this) // Custom height
// [Side Buffer]Content[Side Buffer]
// End buffer

// var img = new Jimp(256, 256, '0', (err, image) => {
//     image.write('test.png');
// });

// #000000 = Black
// #FFFFFF = White
// We can use a buffer

// Can use a buffer to create the image. 
// new Jimp({ data: buffer, width: 1280, height: 768 }, (err, image) => {
//     // this image is 1280 x 768, pixels are loaded from the given buffer.
//   });

// Let's check the original width required for the image. 

// const Jimp = require('Jimp');


// let imageData = [
//   [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF ],
//   [ 0xFF0000FF, 0x00FF00FF, 0xFF0000FF ],
//   [ 0xFF0000FF, 0xFF0000FF, 0x0000FFFF ]
// ];


// let image = new Jimp(3, 3, function (err, image) {
//   if (err) throw err;

//   imageData.forEach((row, y) => {
//     row.forEach((color, x) => {
//       image.setPixelColor(color, x, y);
//     });
//   });

//   image.write('test.png', (err) => {
//     if (err) throw err;
//   });
// });