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
      //TODO turn all simon cells back to original states
      $("#count-panel #count-box").text("--");
    }
  },

  buttonSound: function() {
    $("#sound-button")[0].play();
  },

  /*
   * Toggles the backgroundColor of strict light
   */
  toggleStrictLight: function(state) {
    if(state === "ON") {
      // Turns on the strict light
      $("#strict-panel #strict-light").css("backgroundColor", "#F44336");
    } else if (state === "OFF") {
      // Turns off the strict light
      $("#strict-panel #strict-light").css("backgroundColor", "#370808");
    }
  },

  /*
   * Transitions removing the box shadow and then adds it again
   */
  buttonClickAnimation: function(jqueryBtn) {
    jqueryBtn.addClass("shadow-pulse");
    jqueryBtn.on("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(){
      jqueryBtn.removeClass('shadow-pulse');
    });
  },

  /*
   * Shows various countbox messages and animations as per the param
   * @param txt [Number/String]
   *   String values: WIN, ERROR, START
   *   Number values: 1-20
   */
  countboxAnimation: function(txt) {
    var countbox = $("#count-panel #count-box");

    if(typeof(txt) === "string") {
      // txt is a string
      if(txt === "START") {
        countbox.text("--");
        // Blinks twice
        blinkTwice();
      } else if(txt === "ERROR") {
        countbox.text("!!");
        $("#sound-error")[0].play();
        // Blinks twice
        blinkTwice();
      } else if(txt === "WIN") {
        countbox.text("WIN");
        $("#sound-win")[0].play();
        // Blinks twice
        blinkTwice();
      }
    } else {
      // txt is a number from 1-20
      txt = txt < 10 ? "0" + txt : "" + txt;
      countbox.text(txt);
    }

    function blinkTwice() {
      window.setTimeout(function() {
        countbox.css("color", "#370808");
        window.setTimeout(function() {
          countbox.css("color", "#F44336");
          window.setTimeout(function() {
            countbox.css("color", "#370808");
            window.setTimeout(function() {
              countbox.css("color", "#F44336");
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }
  },

  showSimonSequence: function() {
    var gap = 1400;
    // if(globals.game.sequence.length < 7) {
    //   gap = 1800;
    // } else if(globals.game.sequence.length < 15) {
    //   gap = 1600;
    // } else {
    //   gap = 1400;
    // }

    var simonCells = $("#simon-container .simon-cell");

    console.log("Show Simon Sequence starts at: " + (new Date()).getTime());
    interval = window.setInterval(showSequence, gap);
    // console.log(interval)
    i = 0;
    function showSequence() {
      console.log(`Show Sequence for ${i}:` + (new Date()).getTime());
      //TODO why was -1 chosen
      if(i === globals.game.sequence.length-1) {
        // By this time the last cell in the sequence would
        // have been activated and then we can clear the interval
        // and start listening for input
        window.setTimeout(function() {
          console.log("Starting to listen for input at: " + (new Date()).getTime());
          // console.log(interval);
          clearInterval(interval);
          ui.listenForInput();
        }, 1100);
      }

      if(i === 0) {
        ui.countboxAnimation(globals.game.sequence.length);
      }

      var cellNo = globals.game.sequence[i];
      ui.activateSimonCell($(simonCells[cellNo]));

      i++;
    }
  },

  listenForInput: function() {
    var simonCells = $("#simon-container .simon-cell");
    var ptr = 0;
    simonCells.css("cursor", "pointer");
    console.log(simonCells)
    simonCells.on("click", function(e) {
      // e.preventDefault();
      // e.stopPropagation();
      console.log(e);
      console.log("Simon cell is clicked");
      cellNo = this.getAttribute("data-cell-no");
      //cell No is string hence == was used
      if(cellNo == globals.game.sequence[ptr]) {
          ptr++;
          ui.activateSimonCell($(this));
          if(ptr === globals.game.sequence.length) {
            console.log("Game advanced");
            globals.game.advance();
            simonCells.css("cursor", "default");
            simonCells.off("click");
          }
      } else {
        globals.game.wrongSequence();
        simonCells.css("cursor", "default");
        simonCells.off("click");
      }
    });
  },

  activateSimonCell: function(simonCell) {

    var cellNo = Number(simonCell.attr("id").slice(-1));
    switch (cellNo) {
      case 0:
        $("#sound-0")[0].play();
        simonCell.css("backgroundColor", "#AAECAD");
        simonCell.animate({
          "backgroundColor": "#43A047"
        }, 1000);
        break;
      case 1:
        $("#sound-1")[0].play();
        simonCell.css("backgroundColor", "#F77070");
        simonCell.animate({
          "backgroundColor": "#AB1A1A"
        }, 1000);
        break;
      case 2:
        $("#sound-2")[0].play();
        simonCell.css("backgroundColor", "#5C9BE2");
        simonCell.animate({
          "backgroundColor": "#104F96"
        }, 1000);
        break;
      case 3:
        $("#sound-3")[0].play();
        simonCell.css("backgroundColor", "#FFE32E");
        simonCell.animate({
          "backgroundColor": "#D1A026"
        }, 1000);
        break;
    }
  }


}
