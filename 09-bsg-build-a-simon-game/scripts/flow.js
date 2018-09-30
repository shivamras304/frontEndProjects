var globals = {};

$(window).on("load", loadFunction);
function loadFunction() {
  var slider = $("#slider-container");
  var startButton = $("#start-button");
  var strictButton = $("#strict-button");

  var isBoardOn = false;
  var isStrictOn = false;

  // Turn ON/OFF the entire board
  slider.on("click", function() {
    ui.buttonSound();
    if(isBoardOn) {
      // If the board is on, Turns the board off
      isStrictOn = false;
      ui.toggleBoardState("OFF");
      if(globals.game) delete globals.game;
    } else {
      // If the board is off, Turns the board on
      ui.toggleBoardState("ON");
    }
    isBoardOn = !isBoardOn;
  });

  // If the board is ON, it starts a new game every time it is clicked
  startButton.on("click", function() {
    ui.buttonSound();
    ui.buttonClickAnimation(startButton);
    if(isBoardOn) {
      if(isStrictOn) {
        globals.game = new Game(Game.MODE_STRICT);
      } else {
        globals.game = new Game(Game.MODE_NORMAL);
      }
      globals.game.start();
    }
  });

  // If the board is ON, it alters the game mode, also toggles the strict light
  strictButton.on("click", function() {
    ui.buttonSound();
    ui.buttonClickAnimation(strictButton);
    if(isBoardOn) {
      if(isStrictOn) {
        // If strict light is on, turns it off
        ui.toggleStrictLight("OFF");
      } else {
        // If strict light is off, turns it on
        ui.toggleStrictLight("ON");
      }
      isStrictOn = !isStrictOn;
      if(globals.game) {
        globals.game.changeMode();
      }
    }
  });

}
