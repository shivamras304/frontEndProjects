// Tic Tac Toe AI Game script
// The principles involved in building an AI game have been studied from
// https://mostafa-samir.github.io/Tic-Tac-Toe-AI/
// The code is mostly inspired from the link above.

var GameState = function(oldState) {

  /*
   * public [GamePlayer] : Player 1 (Usually AI)
   */
  this.player1 = "";

  /*
   * public [GamePlayer] : Name of player 2 (Usually Human)
   */
  this.player2 = "";

  /*
   * public [String] : name of the player who has the turn to make a move
   */
  this.turn = "";

  /*
   * public [number] : number of Moves of the AI player
   */
  this.oMovesCount = 0;

  /*
   * public [number] : the result of the game in this State
   */
  this.result = GameState.INVALID;

  /*
   * public [Array] : the board configuration in this state
   */
   this.board = [];

  if(oldState !== undefined) {
    // If the state is constructed using a copy of another state
    this.board = oldState.map(function(item) {
      return item;
    });

    this.player1 = oldState.player1;
    this.player2 = oldState.player2;
    this.oMovesCount = oldState.oMovesCount;
    this.result = oldState.result;
    this.turn = oldState.turn;
  }

  /*
   * public : switches the turn between the two players for the state
   */
  this.advanceTurn = function() {
    this.turn = this.turn === player1 ? this.player2 : this.player1;
  }

  /*
   * public function that enumerates the empty cells in state
   * @return [Array]: indices of all empty cells
   */
  this.emptyCells = function() {
    var indices = [];
    for(var itr = 0; itr < 9 ; itr++) {
      if(this.board[itr] === "E") {
        indices.push(itr);
      }
    }
    return indices;
  }

  /*
   * public  function that checks if the state is a terminal state or not
   * the state result is updated to reflect the result of the game
   * @returns [Boolean]: true if it's terminal, false otherwise
   */
  this.isTerminal = function() {
      var B = this.board;
      var that = this;

      function updateResultForWinner(symbol) {
        if(symbol === that.player1.getSymbol()) {
          that.result = GameState.PLAYER1_WINS;
        } else {
          that.result = GameState.PLAYER2_WINS;
        }
      }

      //check rows
      for(var i = 0; i <= 6; i = i + 3) {
          if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
              updateResultForWinner(B[i]) //update the state result
              return true;
          }
      }

      //check columns
      for(var i = 0; i <= 2 ; i++) {
          if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
              updateResultForWinner(B[i]) //update the state result
              return true;
          }
      }

      //check diagonals
      for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
          if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
              updateResultForWinner(B[i]) //update the state result
              return true;
          }
      }

      var available = this.emptyCells();
      if(available.length == 0) {
          //the game is draw
          this.result = GameState.GAME_DRAW; //update the state result
          return true;
      }
      else {
          return false;
      }
  };
}
GameState.INVALID = -1;
GameState.GAME_RUNNING = 0;
GameState.PLAYER1_WINS = 1;
GameState.PLAYER2_WINS = 2;
GameState.GAME_DRAW = 3;

/*
 * Represents basic requirements of a game player
 * @param symbol: Either X or O as chosen by the player(s)
 * @param name: Name of the player
 * TODO two players cannot have same name!
 */
var GamePlayer = function(_symbol, _name) {
  var symbol = _symbol;
  var name = _name;

  this.getSymbol() {
    return symbol;
  }

  this.getName() {
    return name;
  }
}
