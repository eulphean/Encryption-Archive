// Served through nodejs. It should show a table of all the entries that are 
// created on the Encryption-Archive website. 
var socket; 
var table;

var localhostURL = "http://localhost:5000/store"
var herokuURL = "https://mysterious-shore-86207.herokuapp.com/store";

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

function logTime(time) {
  console.log('Socket Connection Alive: ' + time); 
}

function onEntries() {
  // Clear the table first. 
  clearTable(); 
  var data = getData('show'); 
  socket.emit('readEntries', data);
}

function onDownload() {
  // Get all the entries from the database. 
  clearTable();
  var data = getData('download'); 
  socket.emit('readEntries', data);
}

function getData(s) {
  var startDate = document.getElementById('start').value; 
  var endDate = document.getElementById('end').value; 
  var externalBufferRows = document.getElementById('externalbuffer').value
  var inbetweenBufferRows = document.getElementById('inbetweenbuffer').value;

  var data = { 
    from: startDate, 
    to: endDate,
    state: s, // Determines what kind of callback to fire from the store. 
    erows: externalBufferRows,
    irows: inbetweenBufferRows
  }; 

  console.log('Browser payload: ' + data.erows + ' ' + data.irows); 

  return data; 
}

function onConnected() {
  console.log('Socket ' + socket.id + ' Connected');

  // Subsribe to other events. 
  socket.on('showEntries', showEntries); 
  socket.on('imageData', downloadImage); 
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

function downloadImage(imageData) {
  var weave = document.getElementById('weave');
  weave.href = imageData;
  var date = new Date(); 
  var dateString = date.toDateString();
  var timeString = date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds(); 
  var name = "Weave " + dateString + ' ' + timeString + '.png'; 
  weave.download = name;
  weave.click();
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