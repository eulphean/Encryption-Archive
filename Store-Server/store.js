// Author: Amay Kataria
// Date: 08/19/2019
// File: store.js
// Description: Server side implementation to store all the responses put on Encryption-Archive 

var express = require('express'); 
var fs = require('fs'); 
var socket = require('socket.io');

// ------------------ Express webserver ------------------------ //
var app = express(); 
var server = app.listen(5000);
app.use(express.static('Public')); 
console.log('Running express server at port 5000'); 

// ------------------ Websocket ------------------------ //
var io = socket(server); 
var appSocket = io.of('/app').on('connection', onAppConnect); // Connects all web instance to this. 
var receiptSocket = io.of('/receipt').on('connection', onServerConnect); // Connects receipt server to this. 
var storeStocket = io.of('/store').on('connection', onStoreConnect); // Connects the web instance to read data. 

function onAppConnect(socket) {
    console.log('New App connection : ' + socket.id); 
    socket.on('payload', onPayload); 
}

function onServerConnect(socket) {
    console.log('New Server connection : ' + socket.id);
}

function onStoreConnect(socket) {
    console.log('New Store connection : ' + socket.id); 
    socket.on('read', onRead); 
}

function onRead() {
    console.log('Reading through the store');
    // Read the file
    fs.readFile(dbFile, 'utf-8', function(err, data) {
        if (err) throw RTCRtpReceiver; 
        var payload = JSON.parse(data); 
        storeStocket.emit('payload', payload); 
    });
}

function onPayload(payload) {
    console.log('New Payload Received');

    // Store this payload into the file
    writePayload(payload); 

    // Emit this data on the server socket. 
    receiptSocket.emit('payload', payload); 
}

// ------------------ Database -------------------------- //
const dbFile = './db.json'; 
function writePayload(payload) {
    // Write payload to dbFile. 
    fs.readFile(dbFile, 'utf-8', function(err, data) {
        if (err) throw err; 
        var objects = JSON.parse(data); 
        objects.entries.push(payload); 
        fs.writeFile(dbFile, JSON.stringify(objects), 'utf-8', function(err) {
            if (err) throw err;
            console.log('Success: DB updated.'); 
        }); 
    }); 
}
