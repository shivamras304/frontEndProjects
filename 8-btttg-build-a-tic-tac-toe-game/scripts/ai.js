/*
 * Constructs an action that the ai player could make
 * @param pos [Number]: the cell position the ai would make its action in
 * made that action
 */
var AIAction = function(pos) {

  // public : the position on the board that the action would put the board value on
  this.movePosition = pos;

  //public : the minimax value of the state that the action leads to when applied
  this.minimaxVal = 0;

  /*
   * public : applies the action to a state to get the next state
   * @param state [State]: the state to apply the action to
   * @return [State]: the next state
   */
  this.applyTo = function(state) {
    var next = new GameState(state);

    //put the corresponding value on the board
    if(state.turn === state.player1.getName())
      next.board[this.movePosition] = GameState.BOARD_PLAYER1;
    else
      next.board[this.movePosition] = GameState.BOARD_PLAYER2;

    if(state.turn === state.player1.getName())
      next.oMovesCount++;

    next.advanceTurn();

    return next;
  }
};

/*
 * public static method that defines a rule for sorting AIAction in ascending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.ASCENDING = function(firstAction, secondAction) {
  if(firstAction.minimaxVal < secondAction.minimaxVal)
    return -1; //indicates that firstAction goes before secondAction
  else if(firstAction.minimaxVal > secondAction.minimaxVal)
    return 1; //indicates that secondAction goes before firstAction
  else
    return 0; //indicates a tie
}

/*
 * public static method that defines a rule for sorting AIAction in descending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.DESCENDING = function(firstAction, secondAction) {
  if(firstAction.minimaxVal > secondAction.minimaxVal)
    return -1; //indicates that firstAction goes before secondAction
  else if(firstAction.minimaxVal < secondAction.minimaxVal)
    return 1; //indicates that secondAction goes before firstAction
  else
    return 0; //indicates a tie
}

/*
 * Constructs an AI player with a specific level of intelligence
 * @param symbol [String]: symbol of the AI
 * @param name [String]: name of the AI, usually "Computer"
 * @param level [String]: the desired level of intelligence
 */
var AIPlayer = function(symbol, name, level) {

  GamePlayer.call(symbol, name);

  //private [Number]: level of intelligence the player has
  var levelOfIntelligence = level;

  //private [Game]: the game the player is playing
  var game = {};

  /*
   * private recursive function that computes the minimax value of a game state
   * @param state [GameState] : the state to calculate its minimax value
   * @returns [Number]: the minimax value of the state
   */
  function minimaxValue(state) {
    if(state.isTerminal()) {
      //a terminal game state is the base case
      return Game.score(state);
    }
    else {
      var stateScore; // this stores the minimax value we'll compute

      if(state.turn === state.player2.getName())
        // Human wants to maximize --> initialize to a value smaller than any possible score
        stateScore = -1000;
      else
        // AI wants to minimize --> initialize to a value larger than any possible score
        stateScore = 1000;

      var availablePositions = state.emptyCells();

      //enumerate next available states using the info form available positions
      var availableNextStates = availablePositions.map(function(pos) {
        var action = new AIAction(pos);

        var nextState = action.applyTo(state);

        return nextState;
      });

      /* calculate the minimax value for all available next states
       * and evaluate the current state's value */
      availableNextStates.forEach(function(nextState) {
        var nextScore = minimaxValue(nextState);
        if(state.turn === state.player2.getName()) {
          // Human wants to maximize --> update stateScore iff nextScore is larger
          if(nextScore > stateScore)
            stateScore = nextScore;
        }
        else {
          // AI wants to minimize --> update stateScore iff nextScore is smaller
          if(nextScore < stateScore)
            stateScore = nextScore;
        }
      });

      return stateScore;
    }
  }

  /*
   * private function: make the ai player take a blind move
   * that is: choose the cell to place its symbol randomly
   * @param turn [String]: the name of the player who has the turn to play
   */
  function takeABlindMove(turn) {
    var available = game.currentState.emptyCells();
    var randomCell = available[Math.floor(Math.random() * available.length)];
    var action = new AIAction(randomCell);

    var next = action.applyTo(game.currentState);

    //TODO ui.insertAt(randomCell, turn);

    game.advanceTo(next);
  }

  /*
   * private function: make the ai player take a novice move
   * that is: mix between choosing the optimal and suboptimal minimax decisions
   * @param turn [String]: the name of the player who has the turn to play
   */
  function takeANoviceMove(turn) {
    var available = game.currentState.emptyCells();

    //enumerate and calculate the score for each available actions to the ai player
    var availableActions = available.map(function(pos) {
      var action =  new AIAction(pos); //create the action object
      var nextState = action.applyTo(game.currentState); //get next state by applying the action

      action.minimaxVal = minimaxValue(nextState); //calculate and set the action's minimax value

      return action;
    });

    //sort the enumerated actions list by score
    if(turn === game.currentState.player2.getName())
      //Human maximizes --> sort the actions in a descending manner to have the action with maximum minimax at first
      availableActions.sort(AIAction.DESCENDING);
    else
    //AI minimizes --> sort the actions in an ascending manner to have the action with minimum minimax at first
      availableActions.sort(AIAction.ASCENDING);

    /*
     * take the optimal action 40% of the time, and take the 1st suboptimal action 60% of the time
     */
    var chosenAction;
    if(Math.random()*100 <= 40) {
      chosenAction = availableActions[0];
    }
    else {
      if(availableActions.length >= 2) {
        //if there is two or more available actions, choose the 1st suboptimal
        chosenAction = availableActions[1];
      }
      else {
        //choose the only available actions
        chosenAction = availableActions[0];
      }
    }
    var next = chosenAction.applyTo(game.currentState);

    //TODO ui.insertAt(chosenAction.movePosition, turn);

    game.advanceTo(next);
  }

  /*
   * private function: make the ai player take a blind move
   * that is: choose the optimal minimax decision
   * @param turn [String]: the name of the player who has the turn to play
   */
  function takeAMasterMove(turn) {
    var available = game.currentState.emptyCells();

    //enumerate and calculate the score for each avaialable actions to the ai player
    var availableActions = available.map(function(pos) {
      var action =  new AIAction(pos); //create the action object
      var next = action.applyTo(game.currentState); //get next state by applying the action

      action.minimaxVal = minimaxValue(next); //calculate and set the action's minmax value

      return action;
    });

    //sort the enumerated actions list by score
    if(turn === game.currentState.player2.getName())
      //Human maximizes --> sort the actions in a descending manner to have the action with maximum minimax at first
      availableActions.sort(AIAction.DESCENDING);
    else
    //AI minimizes --> sort the actions in an ascending manner to have the action with minimum minimax at first
      availableActions.sort(AIAction.ASCENDING);

    //take the first action as it's the optimal
    var chosenAction = availableActions[0];
    var next = chosenAction.applyTo(game.currentState);

    //TODO ui.insertAt(chosenAction.movePosition, turn);

    game.advanceTo(next);
  }

  /*
   * public method to specify the game the ai player will play
   * basically a setter
   * @param _game [Game] : the game the ai will play
   */
  this.plays = function(_game){
    game = _game;
  };

  /*
   * public function: notify the ai player that it's its turn
   * @param turn [String]: the name of the player who has the turn to play
   */
  this.notify = function(turn) {
    switch(levelOfIntelligence) {
      //invoke the desired behavior based on the level chosen
      case AIPlayer.LEVEL_BLIND: takeABlindMove(turn); break;
      case AIPlayer.LEVEL_NOVICE: takeANoviceMove(turn); break;
      case AIPlayer.LEVEL_MASTER: takeAMasterMove(turn); break;
    }
  };
};

//possible intelligence levels of the AI
AIPlayer.LEVEL_BLIND = 0;
AIPlayer.LEVEL_NOVICE = 1;
AIPlayer.LEVEL_MASTER = 2;

/*
 * AIPlayer inherits from GamePlayer
 */
AIPlayer.prototype = Object.create(GamePlayer)
AIPlayer.prototype.constructor = AIPlayer;
