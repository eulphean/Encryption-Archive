// Author: Amay Kataria
// Date: 08/19/2019
// File: store.js
// Description: Server side implementation to store all the responses put on Encryption-Archive 

var http = require('http'); // 1 - Import Node.js core module
var server = http.createServer(function (req, res) {   // 2 - creating server
    // CORS headers to allow communication of P5.js with local webserver. 
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Request-Method': '*',
        'Access-Control-Allow-Headers':'Content-Type'
        /** add other headers as per requirement */
    };

    // With CORS, I will always receive the OPTIONS request first. Just successfully return from 
    // this and process the POST after this. 
    if (req.method == 'OPTIONS') {
        res.writeHead(200, headers); 
        res.end(); 
    }

    // PUT request to store data on this webserver. 
    if (req.method == 'POST') {
        if (req.url == '/store') {
            var body = '';
            req.on('data', function(data) {
                body += data
            });
            
            req.on('end', function() {
                var parsed = JSON.parse(body); 
                // Asynch call to store the body data in the database. 
                res.writeHead(200, headers)
                res.end('POST Success'); 
            }); 
        }
    } else if (req.method == 'GET') {
        if (req.url == '/') { //check the URL of the current request
            // Create response
            res.writeHead(200, headers);   
            res.write('GET Success');
            res.end();
        }
    }
});

server.listen(5000);
console.log('Node.js web server at port 5000 is running..')