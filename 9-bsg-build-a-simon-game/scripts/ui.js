var ui = {
  toggleBoardState: function(state) {
    if (state === "ON") {
      // Turning the board ON

      // Moves the slider to the right
      $("#slider-container #slider").css({
        "left": "auto",
        "right": "0"
      });

      // Lights up the count panel
      $("#count-panel #count-box").css("color", "#F44336");

    } else if (state === "OFF"){
      // Turning the board OFF

      // Moves the slider to the left
      $("#slider-container #slider").css({
        "right": "auto",
        "left": "0"
      });

      // Lights off for the count panel
      $("#count-panel #count-box").css("color", "#5E0E0E");

      // Turns off the strict light
      ui.toggleStrictLight("OFF");

    }
  },

  toggleStrictLight: function(state) {
    if(state === "ON") {
      // Turns on the strict light
      $("#strict-panel #strict-light").css("backgroundColor", "#F44336");
    } else if (state === "OFF") {
      // Turns off the strict light
      $("#strict-panel #strict-light").css("backgroundColor", "#370808");
    }
  },

  buttonClickAnimation: function(jqueryBtn) {
    jqueryBtn.addClass("shadow-pulse");
    jqueryBtn.on("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(){
      jqueryBtn.removeClass('shadow-pulse');
    });
  }
}
