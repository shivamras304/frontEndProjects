// Tic Tac Toe AI Game script
// The principles involved in building an AI game have been studied from
// https://mostafa-samir.github.io/Tic-Tac-Toe-AI/
// The code is mostly inspired from the link above.

var GameState = function(oldState) {

  /*
   * public [GamePlayer]: Player 1 (Usually AI)
   */
  this.player1 = "";

  /*
   * public [GamePlayer]: Player 2 (Usually Human)
   */
  this.player2 = "";

  /*
   * public [String]: name of the player who has the turn to make a move
   */
  this.turn = "";

  /*
   * public [Number]: number of Moves of the AI player
   */
  this.oMovesCount = 0;

  /*
   * public [Number]: the result of the game in this State
   */
  this.result = GameState.INVALID;

  /*
   * public [Array]: the board configuration in this state
   * the board will have 3 possible values:
   * IMPORTANT
   * 0 : Empty cell
   * 1 : Player 1's move
   * 2 : Player 2's move
   */
  this.board = [];

  if(oldState !== undefined) {
    // If the state is constructed using a copy of another state
    this.board = oldState.board.map(function(item) {
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
    this.turn = this.turn === this.player1.getName() ?
      this.player2.getName() : this.player1.getName();
  }

  /*
   * public function that enumerates the empty cells in state
   * @return [Array]: indices of all empty cells
   */
  this.getEmptyCells = function() {
    var indices = [];
    for(var itr = 0; itr < 9 ; itr++) {
      if(this.board[itr] === GameState.BOARD_EMPTYCELL) {
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

    function updateResultForWinner(boardSymbol, winningSequence) {
      if(boardSymbol === GameState.BOARD_AI) {
        that.result = GameState.AI_WINS;
      } else {
        that.result = GameState.HUMAN_WINS;
      }
      // Updating winning sequence here, sets the winning sequence during
      // minimax computations also
    }

    //check rows
    for(var i = 0; i <= 6; i = i + 3) {
      if(B[i] !== GameState.BOARD_EMPTYCELL && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
        updateResultForWinner(B[i], [i, i + 1, i + 2]) //update the state result
        return true;
      }
    }

    //check columns
    for(var i = 0; i <= 2 ; i++) {
      if(B[i] !== GameState.BOARD_EMPTYCELL && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
        updateResultForWinner(B[i], [i, i + 3, i + 6]) //update the state result
        return true;
      }
    }

    //check diagonals
    for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
      if(B[i] !== GameState.BOARD_EMPTYCELL && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
        updateResultForWinner(B[i], [i, i + j, i + 2*j]) //update the state result
        return true;
      }
    }

    var available = this.getEmptyCells();
    if(available.length === 0) {
      //the game is draw
      this.result = GameState.GAME_DRAW; //update the state result
      return true;
    }
    else {
      return false;
    }
  };
}

//possible results of a game state
GameState.INVALID = -1;
GameState.GAME_RUNNING = 0;
GameState.AI_WINS = 1;
GameState.HUMAN_WINS = 2;
GameState.GAME_DRAW = 3;

//possible values in the board Array
GameState.BOARD_EMPTYCELL = 0;
GameState.BOARD_AI = 1;
GameState.BOARD_HUMAN = 2;

/*
 * Represents basic requirements of a game player
 * @param symbol [String]: Either X or O as chosen by the player(s)
 * @param name [String]: Name of the player
 * TODO two players cannot have same name!
 */
var GamePlayer = function(_symbol, _name) {
  // private
  var symbol = _symbol;
  // private
  var name = _name;

  this.getSymbol = function() {
    return symbol;
  }

  this.getName = function() {
    return name;
  }
}

/*
 * Constructs a game object to be played
 * @param autoPlayer [AIPlayer] : the AI player to be play the game with
 * this is what glues all the components together
 */
var Game = function(aiPlayer, humanPlayer) {

    //public [AIPlayer]: initialize the ai player for this game
    this.aiPlayer = aiPlayer;

    //public [HumanPlayer]: initialize the human player for this game
    this.humanPlayer = humanPlayer;

    // public : initialize the game current state to empty board configuration
    this.currentState = new GameState();

    this.currentState.board =
      [GameState.BOARD_EMPTYCELL, GameState.BOARD_EMPTYCELL, GameState.BOARD_EMPTYCELL,
       GameState.BOARD_EMPTYCELL, GameState.BOARD_EMPTYCELL, GameState.BOARD_EMPTYCELL,
       GameState.BOARD_EMPTYCELL, GameState.BOARD_EMPTYCELL, GameState.BOARD_EMPTYCELL];

    this.currentState.turn = this.humanPlayer.getName(); //Human plays first
    this.currentState.player1 = this.aiPlayer;
    this.currentState.player2 = this.humanPlayer;
    /*
     * initialize game status to beginning
     */
    this.status = Game.STATUS_BEGINNING;

    /*
     * public function that advances the game to a new state
     * @param _state [State]: the new state to advance the game to
     */
    this.advanceTo = function(_state) {
      this.currentState = _state;
      if(_state.isTerminal()) {
        this.status = Game.STATUS_ENDED;

        if(_state.result === GameState.HUMAN_WINS) {
            //Human won
            ui.switchViewToHumanWins();
        }
        else if(_state.result === GameState.AI_WINS) {
            //Human lost
            ui.switchViewToAIWins();
        }
        else {
          //it's a draw
          ui.switchViewToDraw();
        }
      }
      else {
        //the game is still running
        if(this.currentState.turn === this.currentState.player2.getName()) {
          ui.switchViewToHuman();
        }
        else {
          ui.switchViewToAI();
          var that = this;
          //notify the AI player its turn has come up after 2seconds
          window.setTimeout(function() {
            that.aiPlayer.notify(that.aiPlayer.getName());
          }, 1000);
          // this.aiPlayer.notify(this.aiPlayer.getName());
        }
      }
    };

    /*
     * starts the game
     */
    this.start = function() {
      if(this.status === Game.STATUS_BEGINNING) {
        //invoke advanceTo with the initial state
        this.advanceTo(this.currentState);
        this.status = Game.STATUS_RUNNING;
      }
    }
};
//possible values for status
Game.STATUS_BEGINNING = 0;
Game.STATUS_RUNNING = 1;
Game.STATUS_ENDED = 2;

/*
 * public static function that calculates the score of the human player in a given terminal state
 * @param _state [State]: the state in which the score is calculated
 * @return [Number]: the score calculated for the human player
 */
Game.score = function(_state) {
  if(_state.result === GameState.HUMAN_WINS){
    // the human player won
    return 10 - _state.oMovesCount;
  }
  else if(_state.result === GameState.AI_WINS) {
    //the human player lost
    return - 10 + _state.oMovesCount;
  }
  else {
    //it's a draw
    return 0;
  }
}
