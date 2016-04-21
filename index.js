function getUrl(name) {
  var queryUrl = "https://query.yahooapis.com/v1/public/yql?";
  var queryString = "q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20" +
    "(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+name+"%2C%20ak%22)&format=json&env=store%" +
    "3A%2F%2Fdatatables.org%2Falltableswithkeys";
  return queryUrl+queryString;
}
function getWeather() {
  var city = $('select option:selected').text();
  $.get({
    dataType: "json",
    url: getUrl(city),
    success: addContent,
    error: function(e) {
      alert('Sorry! Service unavailable')
    }
  });
}
var addContent = function (data){
  $(".content").empty();
  $(".content").append("<div class='current'></div>");
  var weather = data.query.results.channel;
  var temperature = weather.item.condition.temp;
  $(".current").append("<div class='image'><img src="+weather.image.url+"></div>");
  $(".current").append("<div class='temp'>"+convertTemperatureToCelsius(temperature)+"°C</div>");
  $(".current").append("<table><tr><td>Humidity</td><td>" + weather.atmosphere.humidity + "%</td></tr>" +
    "<tr><td>Wind speed</td><td>" + weather.wind.speed + "mph</td></tr>" +
    "<tr><td>Sunrise</td><td>" + weather.astronomy.sunrise + "</td></tr>" +
    "<tr><td>Sunset</td><td>" + weather.astronomy.sunset + "</td></tr></table>");
};

function convertTemperatureToCelsius(temp){
  var tempCelsius = Math.round((temp-32)*5/9);
  if(tempCelsius > 0){
    return "+" + tempCelsius;
  }
}
$('select').on('change', getWeather);

getWeather();

