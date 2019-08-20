var io = require('socket.io-client'); 

var localhostURL = "http://localhost:5000/receipt"
var herokuURL = "https://mysterious-shore-86207.herokuapp.com/receipt";
var socket = io.connect('https://mysterious-shore-86207.herokuapp.com/receipt');

socket.on('connect', () => {
    console.log('Connected'); 
    socket.on('payload', onPayload);
})

function onPayload (payload) {
    var a = 'Key, Binary, Date, Time: '; 
    var b = payload['key'] + ', ' + payload['binary'] + ', ' + payload['date'] + ', ' + payload['time']; 
    console.log(a + b); 
}