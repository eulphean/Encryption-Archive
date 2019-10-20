// Author: Amay Kataria
// Date: 08/19/2019
// File: store.js
// Description: Server side implementation to store all the responses put on Encryption-Archive 

var express = require('express'); 
var socket = require('socket.io');
var Pool = require('pg').Pool; 

// ------------------ postgresql database ---------------------- // 
const connString = process.env['DATABASE_URL'];
console.log('Database Connection String: ' + connString); 
const pool = new Pool({
    connectionString: connString
}); 

// ------------------ Express webserver ------------------------ //
var app = express(); 
var server = app.listen(process.env.PORT || 5000, function() {
    console.log('Store server successfully started'); 
});
app.use(express.static('Public')); 

// ------------------ Websocket ------------------------ //
var io = socket(server); 
var appSocket = io.of('/app').on('connection', onAppConnect); // Connects all web instance to this. 
var receiptSocket = io.of('/receipt').on('connection', onServerConnect); // Connects receipt server to this. 
var storeSocket = io.of('/store').on('connection', onStoreConnect); // Connects the web instance to read data. 

function onAppConnect(socket) {
    console.log('New App connection : ' + socket.id); 
    socket.on('writePayload', onPayload); 
}

function onServerConnect(socket) {
    console.log('New Server connection : ' + socket.id);
}

function onStoreConnect(socket) {
    console.log('New Store connection : ' + socket.id); 
    socket.on('readEntries', onReadEntries); 
}

function onReadEntries() {
    console.log('Request to Read All Entries');
    pool.query('SELECT * FROM entries', (err, results) => {
        if (err) {
            throw error; 
        }

        storeSocket.emit('showEntries', results.rows); 
    });
}

function onPayload(payload) {
    console.log('New Write Payload Received');
    
    // Store this payload into the file. 
    writePayload(payload); 

    console.log('Emitting Print Payload');
    // Emit this payload to be printed on the receipt printer. 
    receiptSocket.emit('printPayload', payload); 
}

function writePayload(payload) {
    const date = payload.date; 
    const time = payload.time; 
    const key = payload.key; 
    const encrypted = payload.binary; 

    // Write the payload to the database. 
    pool.query('INSERT INTO entries (date, time, key, encrypted) VALUES ($1, $2, $3, $4)', [date, time, key, encrypted], (error, result) => {
        if (error) {
            throw error; 
        }

        console.log('Success: New entry in the databse with key ' + key); 
    }); 
}
