var view;

var Asher = function() {
  console.log("Starting server!")
  net = require('net');
  view = new View();

  net.createServer(function (socket) {
    view.showMessage("Asher Connected!")
    // Handle incoming messages from clients.
    socket.on('data', function (data) {
      var recieved = String(data)
      var [option, msg] = recieved.split("$x")
      if (String(option) == "response"){
        console.log("message: " + msg)
        view.showMessage(String(msg))
      }else if (String(option) == "question"){
        console.log('sending.... ')
        socket.write(String(msg))
      }
      console.log("did i get it?")
      console.log(recieved)
      console.log(option)

    });


    // Remove the client from the list when it leaves
    socket.on('end', function () {
      view.showMessage("Asher Disconnect!")
    });
  }).listen(5000);
}
