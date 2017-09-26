var reminder = {
  updateInterval: 1000,
  intervalId: undefined
}

var Reminder = require('config-js');
var reminder = new Reminder('./config/times.js');

reminder.setReminder = function () {
  var current = reminder.get(time.start)
  console.log(current)
}

reminder.init = function () {
  this.intervalId = setInterval(function () {
    this.setReminder();
  }.bind(this), this.updateInterval);
}
