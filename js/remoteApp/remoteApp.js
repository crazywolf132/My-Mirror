var remoteApp = {
  updateInterval: 100,
  intervalId: null
}
var socketIO;
var view;
var asher;

var Config = require('config-js');
var config = new Config('./config/default.js');

remoteApp.init = function () {
  view = new View();
  asher = new Asher();
  var MAIN_DIR = __dirname.replace("system","");
  console.log(__dirname)
  var connect = require('connect');
	var serveStatic = require('serve-static');
	connect().use(serveStatic(__dirname + '/remoteApp')).listen(3000, function(){
		console.log('Server running on 3000...');
	});

	//Socket server for communication between the remote app and the system
	console.log("setup socket.io");
	socketIO = require('socket.io')(8888);
	console.log("listenin¡g on port 8888");
	socketIO.on('connection', function (socket) {
		console.log("new client connected");
		view.showMessage("New device connected!");

		socket.on('query', function (query) {
			console.log("new query "+query);
			view.setTitle(query);
			launchAppWithQuery(query);
		});

    socket.on('the-text', function (result) {
      console.log(result)
      asher.showMessage(result)
    })

		socket.on('install-app', function (url) {
			installApp(url);
		});

    socket.on('change-view', function (item) {
      changeIcons(item)
    })

    data = getCurrentIcons();
    socket.emit('whats-running', data)

		var webview = document.querySelector("#mainAppView");
		if(webview){
			webview.send('remoteConnect');
		}
	});

	socketIO.on('disconnect',function(){
		view.showToast("Device disconnected");
	});
}

function changeIcons(item) {
  //time,date,weather,rain,news,compliment
  var PythonShell = require('python-shell');
  var options = {
    mode: 'text',
    args: [String(item)]
  };
  var shell = new PythonShell('main.py', { args: [String(item)] });

  shell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    socketIO.emit('whats-updated', item, message)
    socketIO.emit('all-done')
  });

}

function getCurrentIcons(){
  var time          = config.get('display.time');
  var compliments   = config.get('display.compliment');
  var weather       = config.get('display.temp');
  var news          = config.get('display.news');
  var date          = config.get('display.date');
  var rain          = config.get('display.rain');
  //console.log('time,date,weather,rain,news,compliment')
  var _string = time+"/"+date+"/"+weather+"/"+rain+"/"+news+"/"+compliments
  //console.log(_string)
  return _string
}
