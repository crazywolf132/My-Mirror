var displayer = {
  updateInterval: 100,
  intervalId: null
}

var Config = require('config-js');
var config = new Config('./config/default.js');

displayer.getStatus = function () {

  var Shown           = "showable"
  var Hidden          = "hideme"
  var timeEl          = config.get('display.time');
  var complimentsEl   = config.get('display.compliment');
  var weatherEl       = config.get('display.temp');
  var newsEl          = config.get('display.news');
  var dateEl          = config.get('display.date');
  var rainEl          = config.get('display.rain');


  var currentTimeEl   = $('.timeSection');
  var currentCompEl   = $('.complimentSection');
  var currentWeather  = $('.tempSection');
  var currentNewsEl   = $('.newsSection');
  var currentDateEl   = $('.dateSection');
  var currentRainEl   = $('.rainSection');

  if (currentTimeEl.hasClass(Shown)) {
    if (!timeEl) {
      currentTimeEl.removeClass(Shown)
      currentTimeEl.addClass(Hidden);
      currentTimeEl.css("display", "none")
    }
  }else if (currentTimeEl.hasClass(Hidden)) {
    if (timeEl) {
      currentTimeEl.removeClass(Hidden)
      currentTimeEl.addClass(Shown)
      currentTimeEl.css("display", "block")
    }
  }

  if (currentCompEl.hasClass(Shown)) {
    if (!complimentsEl) {
      currentCompEl.removeClass(Shown)
      currentCompEl.addClass(Hidden)
      currentCompEl.css("display", "none")
    }
  }else if (currentCompEl.hasClass(Hidden)) {
    if (complimentsEl) {
      currentCompEl.removeClass(Hidden)
      currentCompEl.addClass(Shown)
      currentCompEl.css("display", "block")
    }
  }

  if (currentWeather.hasClass(Shown)) {
    if (!weatherEl) {
      currentWeather.removeClass(Shown)
      currentWeather.addClass(Hidden)
      currentWeather.css("display", "none")
    }
  }else if (currentWeather.hasClass(Hidden)) {
    if (weatherEl) {
      currentWeather.removeClass(Hidden)
      currentWeather.addClass(Shown)
      currentWeather.css("display", "block")
    }
  }

  if (currentNewsEl.hasClass(Shown)) {
    if (!newsEl) {
      currentNewsEl.removeClass(Shown)
      currentNewsEl.addClass(Hidden)
      console.log("WE NEED TO HIDE THIS!")
      currentNewsEl.css("display", "none")
    }
  } else if (currentNewsEl.hasClass(Hidden)) {
    if (newsEl) {
      currentNewsEl.removeClass(Hidden)
      currentNewsEl.addClass(Shown)
      currentNewsEl.css("display", "block")
    }
  }

  if (currentDateEl.hasClass(Shown)) {
    if (!dateEl) {
      currentDateEl.removeClass(Shown)
      currentDateEl.addClass(Hidden)
      currentDateEl.css("display", "none")
    }
  } else if (currentDateEl.hasClass(Hidden)) {
    if (dateEl) {
      currentDateEl.removeClass(Hidden)
      currentDateEl.addClass(Shown)
      currentDateEl.css("display", "block")
    }
  }

  if (currentRainEl.hasClass(Shown)) {
    if (!rainEl) {
      currentRainEl.removeClass(Shown)
      currentRainEl.addClass(Hidden)
      currentRainEl.css("display", "none")
    }
  } else if (currentRainEl.hasClass(Hidden)) {
    if (rainEl) {
      currentRainEl.removeClass(Hidden)
      currentRainEl.addClass(Shown)
      currentRainEl.css("display", "block")
    }
  }
}

displayer.init = function () {
  this.intervalId = setInterval(function () {
    this.getStatus();
  }.bind(this), this.updateInterval);
}
