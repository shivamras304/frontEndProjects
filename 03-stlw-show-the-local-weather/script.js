var globalnamespace = {
  apiURL: function(latitude, longitude) {
    // var api_key = "83b9b74e3c5628e1b2b2b002bb3bf5de";
    //
    // return ("http://api.openweathermap.org/data/2.5/weather?lat=" +
    //   latitude + "&lon=" + longitude + "&units=metric&APPID=" + api_key);

    return ("https://fcc-weather-api.glitch.me/api/current?lat=" +
      latitude + "&lon=" + longitude);
  },
  getFahrenheit: function(celsius) {
    return Math.round((celsius * 1.8) + 32);
  },
  isCelsius: true,
  tempInCelsius: 0,
  showWeather: function(data) {
    $("#weather-location-name").text(data.name);
    $("#weather-location-country").text(data.sys.country);
    $("#weather-temp-value").text("" + Math.round(data.main.temp));
    this.tempInCelsius = data.main.temp;
    $("#weather-desc").text(data.weather[0].main);
    // $("#weather-icon").attr("href", ("" + data.weather[0].icon));
    globalnamespace.iconGenerator(data.weather[0].main)
    $(".weather-container").animate({
      opacity: 1
    }, 500);

    $("#weather-temp-unit").click(function() {
      if (this.isCelsius === true) {
        this.isCelsius = false;
        $("#weather-temp-value").text("" + this.getFahrenheit(data.main.temp));
        $("#weather-temp-unit").text("F");
      } else {
        this.isCelsius = true;
        $("#weather-temp-value").text("" + Math.round(data.main.temp));
        $("#weather-temp-unit").text("C");
      }
    })
  },
  showError: function(errorMsg) {
    $("#error-msg").text(errorMsg);
    $("#error-msg").css("display", "block");
    $("#weather-temp").css("opacity", "0");
    $("#weather-location").css("opacity", "0");
    $("#weather-icon").css("opacity", "0");
    $(".weather-container").animate({
      opacity: 1
    }, 500);
  },
  iconGenerator: function(desc) {
    var desc = desc.toLowerCase()
    switch (desc) {
      case 'drizzle':
        this.addIcon(desc)
        break;
      case 'clouds':
        this.addIcon(desc)
        break;
      case 'rain':
        this.addIcon(desc)
        break;
      case 'snow':
        this.addIcon(desc)
        break;
      case 'clear':
        this.addIcon(desc)
        break;
      case 'thunderstom':
        this.addIcon(desc)
        break;
      default:
        $('div.clouds').removeClass('hide');
    }
  },
  addIcon: function(desc) {
    $("div." + desc).removeClass("hide");
  }
}




$(document).ready(function(position) {
  navigator.geolocation.getCurrentPosition(
    function success(position) {
      console.log(position);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      $.ajax({
        url: globalnamespace.apiURL(position.coords.latitude, position.coords.longitude),
        success: function(data) {
          if (typeof(data) === "string") {
            data = JSON.parse(data);
          }
          globalnamespace.showWeather(data);
        },
        error: function(_, textStatus) {
          globalnamespace.showError(textStatus);
        }
      })
    },
    function error(err) {
      console.log("ERRROR");
      globalnamespace.showError(err.message);

    }, {
      enableHighAccuracy: true,
      timeout: 10000
    });
})
