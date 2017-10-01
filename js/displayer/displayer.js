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
  var notificationEl  = $('.notes');

  if (currentTimeEl.hasClass(Shown)) {
    if (!timeEl) {
      currentTimeEl.removeClass(Shown)
      currentTimeEl.addClass(Hidden);
      currentTimeEl.css("display", "none")
      if ($('.date').hasClass('move-up')) {
        $('.date').removeClass('move-up')
        socketIO.emit('what-updated', 'time', 'false')
        socketIO.emit('all-done')
      }
    }
  }else if (currentTimeEl.hasClass(Hidden)) {
    if (timeEl) {
      currentTimeEl.removeClass(Hidden)
      currentTimeEl.addClass(Shown)
      currentTimeEl.css("display", "block")
      $('.date').addClass('move-up')
      socketIO.emit('what-updated', 'time', 'true')
      socketIO.emit('all-done')
    }
  }

  if (currentCompEl.hasClass(Shown)) {
    if (!complimentsEl) {
      currentCompEl.removeClass(Shown)
      currentCompEl.addClass(Hidden)
      currentCompEl.css("display", "none")
      socketIO.emit('what-updated', 'compliment', 'false')
      socketIO.emit('all-done')
    }
  }else if (currentCompEl.hasClass(Hidden)) {
    if (complimentsEl) {
      currentCompEl.removeClass(Hidden)
      currentCompEl.addClass(Shown)
      currentCompEl.css("display", "block")
      socketIO.emit('what-updated', 'compliment', 'true')
      socketIO.emit('all-done')
    }
  }

  if (currentWeather.hasClass(Shown)) {
    if (!weatherEl) {
      currentWeather.removeClass(Shown)
      currentWeather.addClass(Hidden)
      currentWeather.css("display", "none")
      socketIO.emit('what-updated', 'weather', 'false')
      socketIO.emit('all-done')
    }
  }else if (currentWeather.hasClass(Hidden)) {
    if (weatherEl) {
      currentWeather.removeClass(Hidden)
      currentWeather.addClass(Shown)
      currentWeather.css("display", "block")
      socketIO.emit('what-updated', 'weather', 'true')
      socketIO.emit('all-done')
    }
  }

  if (currentNewsEl.hasClass(Shown)) {
    if (!newsEl) {
      currentNewsEl.removeClass(Shown)
      currentNewsEl.addClass(Hidden)
      currentNewsEl.css("display", "none")
      socketIO.emit('what-updated', 'news', 'false')
      socketIO.emit('all-done')
    }
  } else if (currentNewsEl.hasClass(Hidden)) {
    if (newsEl) {
      currentNewsEl.removeClass(Hidden)
      currentNewsEl.addClass(Shown)
      currentNewsEl.css("display", "block")
      socketIO.emit('what-updated', 'news', 'true')
      socketIO.emit('all-done')
    }
  }

  if (currentDateEl.hasClass(Shown)) {
    if (!dateEl) {
      currentDateEl.removeClass(Shown)
      currentDateEl.addClass(Hidden)
      currentDateEl.css("display", "none")
      socketIO.emit('what-updated', 'date', 'false')
      socketIO.emit('all-done')
    }
  } else if (currentDateEl.hasClass(Hidden)) {
    if (dateEl) {
      currentDateEl.removeClass(Hidden)
      currentDateEl.addClass(Shown)
      currentDateEl.css("display", "block")
      socketIO.emit('what-updated', 'date', 'true')
      socketIO.emit('all-done')
    }
  }

  if (currentRainEl.hasClass(Shown)) {
    if (!rainEl) {
      currentRainEl.removeClass(Shown)
      currentRainEl.addClass(Hidden)
      currentRainEl.css("display", "none")
      socketIO.emit('what-updated', 'rain', 'false')
      socketIO.emit('all-done')
    }
  } else if (currentRainEl.hasClass(Hidden)) {
    if (rainEl) {
      currentRainEl.removeClass(Hidden)
      currentRainEl.addClass(Shown)
      currentRainEl.css("display", "block")
      socketIO.emit('what-updated', 'rain', 'true')
      socketIO.emit('all-done')
    }
  }
}

displayer.init = function () {
  this.intervalId = setInterval(function () {
    this.getStatus();
  }.bind(this), this.updateInterval);
}
