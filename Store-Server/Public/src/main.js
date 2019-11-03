// Served through nodejs. It should show a table of all the entries that are 
// created on the Encryption-Archive website. 
var socket; 
var table;

var localhostURL = "http://localhost:5000/store"
var herokuURL = "https://mysterious-shore-86207.herokuapp.com/store";
var newOne = '1101';
var newZero = '0010'; 

function setup(){
  table = document.getElementById('entries');
  table.width = displayWidth; // Change
  setupTableTitle(); 

  socket = io(localhostURL, { 
    reconnection: true,
    reconnectionDelay: 500, 
    reconnectionAttempts: Infinity 
  }); 

  socket.on('connect', onConnected); 
}

function draw() {

}

function logTime(time) {
  console.log('Socket Connection Alive: ' + time); 
}

function onEntries() {
  // Clear the table first. 
  clearTable(); 
  var bounds = getBounds('show'); 
  socket.emit('readEntries', bounds);
}

function onDownload() {
  // Get all the entries from the database. 
  clearTable();
  var bounds = getBounds('download'); 
  socket.emit('readEntries', bounds);
}

function getBounds(s) {
  var start = document.getElementById('start').value; 
  var end = document.getElementById('end').value; 
  console.log('Start: ' + start); console.log('End: ' + end); 
  var bounds = { 
    from: start, 
    to: end,
    state: s // Determines what kind of callback to fire from the store. 
  }; 
  return bounds; 
}

function onConnected() {
  console.log('Socket ' + socket.id + ' Connected');

  // Subsribe to other events. 
  socket.on('showEntries', showEntries); 
  socket.on('downloadEntries', downloadEntries)
  socket.on('time', logTime); 
  socket.on('disconnect', () => console.log('Socket Server Disconnected')); 
}

function showEntries(entries) {
  console.log('Received Entries from the Store');

  // Take this payload and show it in the table
  for (var i in entries) {
    var row = table.insertRow(1); // Push on the top.  
    
    var dateCell = row.insertCell(0);
    // NOTE: This splitting logic is necessary to account for the format
    // in which date is retried from the SQL database. 
    var d = entries[i].date.toString().split("T"); 
    dateCell.innerHTML = d[0];
    
    var timeCell = row.insertCell(1); 
    timeCell.innerHTML = entries[i].time; 
    
    var keyCell = row.insertCell(2); 
    keyCell.innerHTML =  entries[i].key; 
    
    var binaryCell = row.insertCell(3); 
    binaryCell.innerHTML = entries[i].encrypted; 
  }
}

function downloadEntries(entries) {
  // Then modify all the entries and store it into a new local array
  // Then create an image using this data (look at python code for original image dimensions)
  
  // Show these entries.
  showEntries(entries);

  // Expand these messages based on the scheme Dylan gave me.
  var expandedMessages = []; 
  for (var i in entries) {
    var newMsg = getExpandedMessage(entries[i].encrypted); 
    expandedMessages.push(newMsg); 
  }

  // Create an image (buffer up/buffer down with a specific dimension)
  // Take these strings (complete them to the end for the width)
  // Append them into the image
  // Download the image. 
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
  dateCell.innerHTML = 'DATE (YYYY-MM-DD)';
  dateCell.width = '10%';

  var timeCell = row.insertCell(1);
  timeCell.innerHTML = 'TIME';
  timeCell.width = '8%';

  var keyCell = row.insertCell(2);
  keyCell.innerHTML = 'KEY';
  keyCell.width = '14%';

  var binaryCell = row.insertCell(3);
  binaryCell.innerHTML = 'BINARY STRING';
  binaryCell.width = '70%';
}

function getExpandedMessage(message) {
  var newMsg = ''; 
  for (var i = 0; i < message.length; i++) {
    if (message[i] === '0') {
      newMsg = newMsg + newZero;
    } else if (message[i] === '1') {
      newMsg = newMsg + newOne; 
    }
  }
  return newMsg; 
}