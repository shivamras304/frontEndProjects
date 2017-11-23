/*
 * Constructs a game object which gives controls for the whole life cycle of game
 * @param mode [Number]: The game mode (strict/normal)
 */
var Game = function(mode) {

  /*
   * private [Number]: The game mode (strict/normal)
   */
  var gameMode = mode;

  /*
   * public [Array]: The sequence of simon cells for the game
   * Max length of array = 20 as the game terminates when the user guesses 20 cells
   */
  this.sequence = [];

  this.repeatThisSequence = false;

  this.changeMode = function() {
    gameMode = gameMode === game.MODE_NORMAL ? Game.MODE_STRICT : Game.MODE_NORMAL;
  }

  this.isTerminal = function() {
    return globals.game.sequence.length === 3;
  }

  this.advance = function() {
    // console.log("Game advanced!!")
    if(globals.game.isTerminal()) {
      ui.countboxAnimation("WIN");
      // Restarts the game again after 3000ms
      window.setTimeout(this.start, 3000);
    }

    if(!globals.game.repeatThisSequence) {
      globals.game.sequence.push(Math.floor(Math.random()*4));
    } else {
      globals.game.repeatThisSequence = false;
    }

    ui.showSimonSequence();
  }

  this.wrongSequence = function() {
    ui.countboxAnimation("ERROR");
    if(gameMode === Game.MODE_NORMAL) {
      globals.game.repeatThisSequence = true;
      globals.game.advance();
    } else if(gameMode === Game.MODE_STRICT) {
      globals.game.start();
    }
  }

  this.start = function() {
    $("#sound-start")[0].play();
    // The following animation takes 400ms to run
    ui.countboxAnimation("START");
    globals.game.sequence = [];
    //After 800ms the game will advance
    window.setTimeout(globals.game.advance, 800);
  }

};
// possible values for game modes
Game.MODE_NORMAL = 1;
Game.MODE_STRICT = 2;
