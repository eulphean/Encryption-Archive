// Served through nodejs. It should show a table of all the entries that are 
// created on the Encryption-Archive website. 
var socket; 
var entries; 
var weave;
var table;

var localhostURL = "http://localhost:5000/store"
var herokuURL = "https://mysterious-shore-86207.herokuapp.com/store";

function setup(){
  table = document.getElementById('entries');
  table.width = displayWidth; 
  setupTableTitle(); 

  socket = io(herokuURL, { reconnection: true }); 
  socket.on('payload', onPayload); 
  socket.on('connect', onConnect); 
  socket.on('disconnect', onDisconnect);
}

function draw() {

}

function onClick() {
  // Clear the table first. 
  clearTable(); 
  socket.emit('read');
}

function onConnect() {
  console.log('Socket: Connected');
}

function onDisconnect() {
  console.log('Socket: Disconnected. Closing socket.'); 
  socket.close();
}

function onPayload(payload) {
  console.log('New Payload');
  // Take this payload and show it in the table
  var entries = payload.entries; 

  for (var i in entries) {
    var row = table.insertRow(1); // Push on the top.  
    
    var dateCell = row.insertCell(0);
    dateCell.innerHTML = entries[i].date; 
    
    var timeCell = row.insertCell(1); 
    timeCell.innerHTML = entries[i].time; 
    
    var keyCell = row.insertCell(2); 
    keyCell.innerHTML =  entries[i].key; 
    
    var binaryCell = row.insertCell(3); 
    binaryCell.innerHTML = entries[i].binary; 
  }
}

function clearTable() {
  var rowCount = table.rows.length;
  for (var x=rowCount-1; x>0; x--) {
    table.deleteRow(x);
  }
}

function setupTableTitle() {
  var row = table.insertRow(0);
 
  var dateCell = row.insertCell(0);
  dateCell.innerHTML = 'DATE';
  dateCell.width = '8%';

  var timeCell = row.insertCell(1);
  timeCell.innerHTML = 'TIME';
  timeCell.width = '8%';

  var keyCell = row.insertCell(2);
  keyCell.innerHTML = 'KEY';
  keyCell.width = '14%';

  var binaryCell = row.insertCell(3);
  binaryCell.innerHTML = 'BINARY STRING';
  binaryCell.width = '70%';

  entries = createButton('ENTRIES');
  entries.position(20, 10);
  entries.size(100, 50); 
  entries.mousePressed(onClick);

  weave = createButton('WEAVE');
  weave.position(140, 10);
  weave.size(100, 50);
}