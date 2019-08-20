var io = require('socket.io-client'); 
var socket = io.connect('http://localhost:5000/receipt');

socket.on('connect', () => {
    console.log('Connected'); 
    socket.on('payload', onPayload);
})

function onPayload (payload) {
    var a = 'Key, Binary, Date, Time: '; 
    var b = payload['key'] + ', ' + payload['binary'] + ', ' + payload['date'] + ', ' + payload['time']; 
    console.log(a + b); 

    // TODO: Print a receipt with that information here. 
}