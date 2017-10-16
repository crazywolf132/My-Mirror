var asher = {
  updateInterval: 0,
  intervalId: null
}

var view;
var asherSocket;

asher.incomming = function () {
  console.log("Starting server!")
  net = require('net');
  view = new View();

  net.createServer(function (socket) {
    // Handle incoming messages from clients.
    socket.on('data', function (data) {
     var recieved = String(data)
     view.asherMessage(recieved)
    });

  }).listen(5000);

}

asher.outGoing = function (Msg) {
  var net = require('net');

  asherSocket = new net.Socket();
  asherSocket.connect(4416, 'localhost', function() {
  	asherSocket.write(String(Msg));
  });

  asherSocket.on('data', function(data) {
  	view.asherMessage(String(data))
  	asherSocket.destroy(); // kill client after server's response
  });

  asherSocket.on('close', function() {
  	console.log('Connection closed');
  });
}


asher.init = function () {
  view = new View();
  view.asherMessage("Asher connected!")
  this.incomming();
}
