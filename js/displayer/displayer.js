var displayer = {
  updateInterval: 30000,
  intervalId: null
}

displayer.getStatus = function () {
  var timeEl          = config.display.time;
  var complimentsEl   = config.display.compliments;
  var weatherEl       = config.display.weather;
  var newsEl          = config.display.news;
  var dateEl          = config.display.date;
}

displayer.init = function () {
  this.intervalId = setInterval(function () {
    this.getStatus();
  }.bind(this), this.updateInterval);
}
