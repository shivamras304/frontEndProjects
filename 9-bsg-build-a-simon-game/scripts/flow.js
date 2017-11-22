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
      //TODO ui.toggleBoardState("on"); //turns on Count Light
    } else {
      //TODO ui.toggleBoardState("off");
    }
    isBoardOn = !isBoardOn;
  });

  // If the board is ON, it starts a new game every time it is clicked
  startButton.on("click", function() {
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
    if(isBoardOn) {
      if(isStrictOn) {
        //TODO ui.toggleStrictLight("on");
      } else {
        //TODO ui.toggleStrictLight("off");
      }
      isStrictOn = !isStrictOn;
      if(game) {
        game.changeMode();
      }
    }
  });
}
