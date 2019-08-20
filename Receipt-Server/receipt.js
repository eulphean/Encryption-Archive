var io = require('socket.io-client'); 
var socket = io.connect('http://localhost:5000/server');

socket.on('connect', () => {
    console.log('Connected'); 
    socket.on('data', newReceiptData);
})

function newReceiptData (data) {
    console.log(data['binary']); 
}