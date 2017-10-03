
var REMOTE_ACTION_TYPE_INPUT = "input";
var REMOTE_ACTION_TYPE_BUTTON = "button";
var MEDIA_HEADER_LAYOUT_FULL = 799;
var MEDIA_HEADER_LAYOUT_PLAY_PAUSE = 800;

var socket;
var asher;
var currentAppIndex;
var homeAppIndex=0;

var appList = [];

window.onload=function(){
	var host = window.location.host;
	host = host.indexOf(":3000") > 0 ? host.replace(":3000","") + ":8888" : host + ":8888";
	console.log(host);
	connect(host);
	connectToAsher();
	setupWebSpeechAPI();
	$("#time").click(function(){
		socket.emit('change-view', 'time')
	});
	$("#date").click(function(){
		socket.emit('change-view', 'date')
	});
	$("#weather").click(function(){
		socket.emit('change-view', 'temp')
	});
	$("#rain").click(function(){
		socket.emit('change-view', 'rain')
	});
	$("#news").click(function(){
		socket.emit('change-view', 'news')
	});
	$("#compliment").click(function(){
		socket.emit('change-view', 'compliment')
	});
	$("#Mobiletime").click(function(){
		socket.emit('change-view', 'time')
	});
	$("#Mobiledate").click(function(){
		socket.emit('change-view', 'date')
	});
	$("#Mobileweather").click(function(){
		socket.emit('change-view', 'temp')
	});
	$("#Mobilerain").click(function(){
		socket.emit('change-view', 'rain')
	});
	$("#Mobilenews").click(function(){
		socket.emit('change-view', 'news')
		reload();
	});
	$("#Mobilecompliment").click(function(){
		socket.emit('change-view', 'compliment')
	});
	$("#asher").click(function(){
		startDictation();
	});
	$("#Mobileasher").click(function(){
		startDictation();
	});
}

function connect(host){
	localStorage.host = host;
	socket = io(host);

	socket.on('connect', function (){
		console.log("Connected!");
	});

	socket.on('whats-running', function (data){
		var [time,date,weather,rain,news,compliment] = data.split('/')
		howToDisplay(time,date,weather,rain,news,compliment);
	});

	socket.on('whats-updated', function(item, value){
		if (String(item) === 'time') {
			changeTime(value);
		} else if (String(item) === 'date') {
			changeDate(value);
		} else if (String(item) === 'news') {
			changeNews(value);
		} else if (String(item) === 'temp') {
			changeWeather(value);
		} else if (String(item) === 'rain') {
			changeRain(value);
		} else if (String(item) === 'compliment'){
			changeCompliment(value);
		}
	})

	socket.on('current-app', function (appIndex){
		launchApp(appIndex);
	});

	socket.on('all-done', function(){
		(function () {
        location.reload();
    }, 2000);
	})

	socket.on('media-header-setup', function (mediaHeader){
		var appIndex = mediaHeader.appIndex;
		if(appIndex == currentAppIndex){
			$("#appMediaHeader").css("background-image","url('"+mediaHeader.uri+"')");
			$("#headerTitle").show().text(mediaHeader.title);
		}
	});

	socket.on('add-action', function (action){
		var appIndex = action.appIndex;
		if(appIndex == currentAppIndex){
			var actionTitle = action.title;
			var actionId = action.id;
			var actionType = action.type;
			$("#appView").css("background-color","white");
			var actionEl = $("<button class='actionButton'>"+actionTitle+"</button>");
			actionEl.click(function(){
				if(actionType == REMOTE_ACTION_TYPE_BUTTON){
					triggerAction(actionId);
				}else{
					var val = prompt(actionTitle);
					if(val){
						triggerAction(actionId,val);
					}
				}
			});
			actionEl.hide().appendTo("#appActions").fadeIn(500);
		}
	});

	socket.on('disconnect', function (){
		$("#remoteActions").empty();
		$("#remoteMediaHeader").empty();
		$("#appGrid").empty();
	});
}
function triggerAction(actionId,param){
	console.log("triggering action "+actionId);
	var data = {actionId:actionId,param:param};
	socket.emit('action-trigger-'+actionId,data);
}

function sendQuery(){
	var q = document.querySelector("#mQuery").value;
	console.log("sending "+q);
	socket.emit('query',q);
}

function inputLeft(){
	socket.emit('input',10);
}

function inputRight(){
	socket.emit('input',11);
}

function changeTime(value){
	if (String(value) === 'true'){
		$("#timeImg").attr('src', '/img/Time_On.png');
		$("#MobiletimeImg").attr('src', '/img/Time_On.png');
	}else if (String(value) === 'false'){
		$("#timeImg").attr('src', '/img/Time_Off.png');
		$("#MobiletimeImg").attr('src', '/img/Time_Off.png');
	}
	(function () {
		document.getElementById("time").innerHTML.reload
		document.getElementById("Mobiletime").innerHTML.reload
	}, 2000);
}
function changeDate(value){
	if (String(value) === 'true'){
		$("#dateImg").attr('src', '/img/Date_On.png');
		$("#MobiledateImg").attr('src', '/img/Date_On.png');
	}else if (String(value) === 'false'){
		$("#dateImg").attr('src', '/img/Date_Off.png');
		$("#MobiledateImg").attr('src', '/img/Date_Off.png');
	}
	(function () {
		document.getElementById("date").innerHTML.reload
		document.getElementById("Mobiledate").innerHTML.reload
	}, 2000);
}
function changeNews(value){
	if (String(value) === 'true'){
		$("#newsImg").attr('src', '/img/News_On.png');
		$("#MobilenewsImg").attr('src', '/img/News_On.png');
	}else if (String(value) === 'false'){
		$("#newsImg").attr('src', '/img/News_Off.png');
		$("#MobilenewsImg").attr('src', '/img/News_Off.png');
	}
	(function () {
		document.getElementById("news").innerHTML.reload
		document.getElementById("Mobilenews").innerHTML.reload
	}, 2000);
}
function changeWeather(value){
	if (String(value) === 'true'){
		$("#weatherImg").attr('src', '/img/Weather_On.png');
		$("#MobileweatherImg").attr('src', '/img/Weather_On.png');
	}else if (String(value) === 'false'){
		$("#weatherImg").attr('src', '/img/Weather_Off.png');
		$("#MobileweatherImg").attr('src', '/img/Weather_Off.png');
	}
	(function () {
		document.getElementById("weather").innerHTML.reload
		document.getElementById("Mobileweather").innerHTML.reload
	}, 2000);
}
function changeRain(value){
	if (String(value) === 'true'){
		$("#rainImg").attr('src', '/img/Rain_On.png');
		$("#MobilerainImg").attr('src', '/img/Rain_On.png');
	}else if (String(value) === 'false'){
		$("#rainImg").attr('src', '/img/Rain_Off.png');
		$("#MobilerainImg").attr('src', '/img/Rain_Off.png');
	}
	(function () {
		document.getElementById("rain").innerHTML.reload
		document.getElementById("Mobilerain").innerHTML.reload
	}, 2000);
}
function changeCompliment(value){
	if (String(value) === 'true'){
		$("#complimentImg").attr('src', '/img/Compliment_On.png');
		$("#MobilecomplimentImg").attr('src', '/img/Compliment_On.png');
	}else if (String(value) === 'false'){
		$("#complimentImg").attr('src', '/img/Compliment_Off.png');
		$("#MobilecomplimentImg").attr('src', '/img/Compliment_Off.png');
	}
	(function () {
		document.getElementById("compliment").innerHTML.reload
		document.getElementById("Mobilecompliment").innerHTML.reload
	}, 2000);
}

function howToDisplay(time, date, weather, rain, news, compliment) {
	//This function is used to determine how to render the icons... weather they are on or off.
	//We will recieve a bunch of variables... they will either be 'true' or 'false'
	if (String(time) === 'true'){
		$("#timeImg").attr('src', '/img/Time_On.png');
		$("#MobiletimeImg").attr('src', '/img/Time_On.png');
		document.getElementById("time").innerHTML.reload
		document.getElementById("Mobiletime").innerHTML.reload
	}else if(String(time) === 'false') {
		$("#timeImg").attr('src', '/img/Time_Off.png');
		$("#MobiletimeImg").attr('src', '/img/Time_Off.png');
		document.getElementById("time").innerHTML.reload
		document.getElementById("Mobiletime").innerHTML.reload
	}
	if (String(date) === 'true'){
		$("#dateImg").attr('src', '/img/Date_On.png');
		$("#MobiledateImg").attr('src', '/img/Date_On.png');
		document.getElementById("date").innerHTML.reload
		document.getElementById("Mobiledate").innerHTML.reload
	}else if(String(date) === 'false') {
		$("#dateImg").attr('src', '/img/Date_Off.png');
		$("#MobiledateImg").attr('src', '/img/Date_Off.png');
		document.getElementById("date").innerHTML.reload
		document.getElementById("Mobiledate").innerHTML.reload
	}
	if (String(weather) === 'true'){
		$("#weatherImg").attr('src', '/img/Weather_On.png');
		$("#MobileweatherImg").attr('src', '/img/Weather_On.png');
		document.getElementById("weather").innerHTML.reload
		document.getElementById("Mobileweather").innerHTML.reload
	}else if(String(weather) === 'false') {
		$("#weatherImg").attr('src', '/img/Weather_Off.png');
		$("#MobileweatherImg").attr('src', '/img/Weather_Off.png');
		document.getElementById("weather").innerHTML.reload
		document.getElementById("Mobileweather").innerHTML.reload
	}
	if (String(rain) === 'true'){
		$("#rainImg").attr('src', '/img/Rain_On.png');
		$("#MobilerainImg").attr('src', '/img/Rain_On.png');
		document.getElementById("rain").innerHTML.reload
		document.getElementById("Mobilerain").innerHTML.reload
	}else if(String(rain) === 'false') {
		$("#rainImg").attr('src', '/img/Rain_Off.png');
		$("#MobilerainImg").attr('src', '/img/Rain_Off.png');
		document.getElementById("rain").innerHTML.reload
		document.getElementById("Mobilerain").innerHTML.reload
	}
	if (String(news) === 'true'){
		$("#newsImg").attr('src', '/img/News_On.png');
		$("#MobilenewsImg").attr('src', '/img/News_On.png');
		document.getElementById("news").innerHTML.reload
		document.getElementById("Mobilenews").innerHTML.reload
	}else if(String(news) === 'false') {
		$("#newsImg").attr('src', '/img/News_Off.png');
		$("#MobilenewsImg").attr('src', '/img/News_Off.png');
		document.getElementById("news").innerHTML.reload
		document.getElementById("Mobilenews").innerHTML.reload
	}
	if (String(compliment) === 'true'){
		$("#complimentImg").attr('src', '/img/Compliment_On.png');
		$("#MobilecomplimentImg").attr('src', '/img/Compliment_On.png');
		document.getElementById("compliment").innerHTML.reload
		document.getElementById("Mobilecompliment").innerHTML.reload
	}else if(String(compliment) === 'false') {
		$("#complimentImg").attr('src', '/img/Compliment_Off.png');
		$("#MobilecomplimentImg").attr('src', '/img/Compliment_Off.png');
		document.getElementById("compliment").innerHTML.reload
		document.getElementById("Mobilecompliment").innerHTML.reload
	}
}

var supportsSpeechApi = ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window);

function setupWebSpeechAPI(){
	if (!supportsSpeechApi) {
	  console.log("Speech recognition not supported");
		$("#asherImg").attr('src', '/img/Asher_Off.png');
		$("#MobileasherImg").attr('src', '/img/Asher_Off.png');
	} else {
	  console.log("Speech recognition supported!");
		$("#asherImg").attr('src', '/img/Asher_On.png');
		$("#MobileasherImg").attr('src', '/img/Asher_On.png');
	}
}

function startDictation() {

    if (supportsSpeechApi) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
				//socket.emit('the-text', e.results[0][0].transcript);
				sendToAsher(e.results[0][0].transcript)
				console.log(e.results[0][0].transcript)
        recognition.stop();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

    }
  }
function connectToAsher() {
	var place = window.location.host;
	place = place.indexOf(":3000") > 0 ? place.replace(":3000","") + ":5000" : place + ":5000";
	localStorage.host = place;
	asher = io(place);

	asher.on('connect', function (){
		console.log("Connected to asher!");
	})
}
function sendToAsher(Msg) {
	asher.emit('data', "question$x" + String(Msg))
}
