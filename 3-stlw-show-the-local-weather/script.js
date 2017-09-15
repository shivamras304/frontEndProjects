var globalnamespace = {
  apiURL: function(latitude, longitude) {
    var api_key = "83b9b74e3c5628e1b2b2b002bb3bf5de";

    return ("http://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude + "&lon=" + longitude + "&units=metric&APPID=" + api_key);
  },
  getFahrenheit: function(celsius) {
    return Math.round((celsius * 1.8) + 32);
  },
  isCelsius: true,
  tempInCelsius: 0

}



$(document).ready(function(position) {
  navigator.geolocation.getCurrentPosition(function success(position) {
      console.log(position);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      $.ajax({
        url: globalnamespace.apiURL(position.coords.latitude, position.coords.longitude),
        success: function(data) {
          if (typeof(data) === "string") {
            data = JSON.parse(data);
          }
          $("#weather-location-name").text(data.name);
          $("#weather-location-country").text(data.sys.country);
          $("#weather-temp-value").text("" + Math.round(data.main.temp));
          globalnamespace.tempInCelsius = data.main.temp;
          $("#weather-desc").text(data.weather[0].main);

          $(".weather-container").animate({
            opacity: 1
          }, 500);

          $("#weather-temp-unit").click(function() {
            if(globalnamespace.isCelsius === true) {
              globalnamespace.isCelsius = false;
              $("#weather-temp-value").text("" + globalnamespace.getFahrenheit(data.main.temp));
              $("#weather-temp-unit").text("F");
            } else {
              globalnamespace.isCelsius = true;
              $("#weather-temp-value").text("" + Math.round(data.main.temp));
              $("#weather-temp-unit").text("C");
            }
          })
        }
      })
    },
    function error() {
      console.log("ERRROR");
    }, {
      enableHighAccuracy: true,
      timeout: 10000
    });
})
