var remoteApp = {
  updateInterval: 100,
  intervalId: null
}
var socketIO;
var view;

remoteApp.init = function () {
  view = new View();
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

		socket.on('launch-app', function (index) {
			console.log("Launching app "+index+" from remote app");
			launchApp(appData[index],null);
		});

		socket.on('install-app', function (url) {
			installApp(url);
		});

    socket.on('change-view', function (item) {
      if (String(item) === 'time'){

      } else if (String(item) === 'compliment') {

      } else if (String(item) === 'temp') {

      } else if (String(item) === 'news') {

      } else if (String(item) === 'date') {

      } else if (String(item) === 'rain') {
        
      }
    })

		var webview = document.querySelector("#mainAppView");
		if(webview){
			webview.send('remoteConnect');
		}
	});

	socketIO.on('disconnect',function(){
		view.showToast("Device disconnected");
	});
}
