var weather = {
  updateInterval: config.weather.interval || 1800000,
	fadeInterval: config.weather.fadeInterval || 1000,
	intervalId: null,
}

var haveConvertedTemperatureCompliments = false;
// Add support for legacy configs that don't define certain variables
if( typeof darkSkyUnits == 'undefined')
	var darkSkyUnits = "auto";

if( typeof darkSkyLanguage == 'undefined')
	var darkSkyLanguage = "en";

if( typeof tempDecimalPlaces == 'undefined')
	var tempDecimalPlaces = 0;

function roundTemp (temp) {
  var scalar = 1 << tempDecimalPlaces;

  temp *= scalar;
  temp  = Math.round ( temp );
  temp /= scalar;

  return temp;
}

weather.updateCurrentWeather = function () {
  $.getJSON('https://api.darksky.net/forecast/' + api.key + '/' + api.lat + ',' + api.lon, function(json, textStatus) {
    var current = json.currently;
    var temp = roundTemp(current.temperature);
    var feelsLikeTemp = roundTemp(current.apparentTemperature);
    var wind = roundVal(current.windSpeed);
    var rainChance = current.precipProbability;
    var celcius = cToF(temp);
    var currentWeatherIcon = current.icon;
    var iconClass = "wi-forecast-io-" + current.icon;
    var icon = $('<span/>').addClass('m8-text-white').addClass('m8-xxxlarge').addClass('icon').addClass('dimmed').addClass('wi').addClass(iconClass);
    var umbrella = $('<span/>').addClass('m8-xxlarge').addClass('m8-text-white').addClass('icon').addClass('dimmed').addClass('wi').addClass('wi-umbrella');
    $('.temp').updateWithText(celcius + '°' + icon.outerHTML())
    $('.rainChance').updateWithText('<h1 class="m8-text-white core-font m8-xxlarge">' + umbrella.outerHTML() + "     " + rainChance + '%' + '</h1>')
  });
}

function cToF (fahrenheit) {
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  var Cel = this.roundTemp(fToCel)
  return(Cel);
}

weather.init = function () {
  this.intervalId = setInterval(function () {
    this.updateCurrentWeather();
  }.bind(this), this.updateInterval);
  this.updateCurrentWeather();
}
