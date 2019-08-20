// Author: Amay Kataria
// Date: 08/19/2019
// File: store.js
// Description: Server side implementation to store all the responses put on Encryption-Archive 

var socket = require('socket.io');
var http = require('http'); // 1 - Import Node.js core module

// HTTP websever to which the socket is attached to. 
var server = http.createServer(); 

// Setup websocket
var io = socket(server); 
var appSocket = io.of('/app').on('connection', onAppConnect); // Connect all web instances to this. 
var receiptSocket = io.of('/receipt').on('connection', onServerConnect); // Connect receipt server to this. 

function onAppConnect(socket) {
    console.log('New App connection : ' + socket.id); 
    socket.on('payload', onPayload); 
}

function onServerConnect(socket) {
    console.log('New Server connection : ' + socket.id);
}

function onPayload(payload) {
    console.log('New Payload Received');

    // Emit this data on the server socket. 
    receiptSocket.emit('payload', payload); 
}


server.listen(5000);

// Client is connected (p5.js app) [All web clients connect to a certain namespace]
// When client emits and store websocket receives, then it emits on Receipt server
// Receipt server connects to a certain namespace 

// All the server code => Keep it backed back.  
// var server = http.createServer(function (req, res) {   // 2 - creating server
//     // CORS headers to allow communication of P5.js with local webserver. 
//     const headers = {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'POST, GET',
//         'Access-Control-Request-Method': '*',
//         'Access-Control-Allow-Headers':'Content-Type'
//         /** add other headers as per requirement */
//     };

//     // With CORS, I will always receive the OPTIONS request first. Just successfully return from 
//     // this and process the POST after this. 
//     if (req.method == 'OPTIONS') {
//         res.writeHead(200, headers); 
//         res.end(); 
//     }

//     // PUT request to store data on this webserver. 
//     if (req.method == 'POST') {
//         if (req.url == '/store') {
//             var body = '';
//             req.on('data', function(data) {
//                 body += data
//             });
            
//             req.on('end', function() {
//                 var parsed = JSON.parse(body); 
//                 // Asynch call to store the body data in the database. 
//                 res.writeHead(200, headers)
//                 res.end('POST Success'); 
//             }); 
//         }
//     } else if (req.method == 'GET') {
//         if (req.url == '/') { //check the URL of the current request
//             // Create response
//             res.writeHead(200, headers);   
//             res.write('GET Success');
//             res.end();
//         }
//     }
// });