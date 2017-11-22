$(window).on("load", loadFunction);
function loadFunction() {
  var slider = $("#slider-container");
  var startButton = $("#start-button");
  var strictButton = $("#strict-button");

  var game;

  var isBoardOn = false;
  var isStrictOn = false;

  // Turn ON/OFF the entire board
  slider.on("click", function() {
    if(isBoardOn) {
      // If the board is on, Turns the board off
      ui.toggleBoardState("OFF");
      if(game) game = undefined;
    } else {
      // If the board is off, Turns the board on
      ui.toggleBoardState("ON");
    }
    isBoardOn = !isBoardOn;
  });

  // If the board is ON, it starts a new game every time it is clicked
  startButton.on("click", function() {
    ui.buttonClickAnimation(startButton);
    if(isBoardOn) {
      if(isStrictOn) {
        game = new Game(Game.MODE_STRICT);
      } else {
        game = new Game(Game.MODE_NORMAL);
      }
      game.start();
    }
  });

  // If the board is ON, it alters the game mode, also toggles the strict light
  strictButton.on("click", function() {
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
      if(game) {
        game.changeMode();
      }
    }
  });
}
