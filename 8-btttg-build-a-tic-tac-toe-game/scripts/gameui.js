var ui = {
  switchViewToHuman: function() {
    // Computer Turn Indicator goes down
    $("#player1-turn").animate({
      top: "0"
    }, 700);
    // Human Turn Indicator goes up
    $("#player2-turn").animate({
      top: "-5rem"
    }, 700);

    $("#game-screen .cell").on("click", function(e) {
      // In jquery callback this refers to target element
      var cellNo = this.getAttribute("data-cell-no")

      var successfulInsertion = ui.insertAt(cellNo, globals.game.humanPlayer.getSymbol());
      if(successfulInsertion) {
        $("#game-screen .cell").off();

        var nextState = new GameState(globals.game.currentState);
        nextState.board[cellNo] = GameState.BOARD_HUMAN;
        nextState.advanceTurn();

        globals.game.advanceTo(nextState);
      }
    });
  },

  switchViewToAI: function() {
    // Human Turn Indicator goes down
    $("#player2-turn").animate({
      top: "0"
    }, 700);
    // Computer Turn Indicator goes up
    $("#player1-turn").animate({
      top: "-5rem"
    }, 700);
  },

  /*
   * Inserts the given symbol at given position and sounds
   * If human tries to click on non empty cell, it beeps
   * It returns true if the insertion was for an empty cell
   * else returns false
   */
  insertAt: function(position, symbol) {
    var cell = $(`#cell-${position}`);
    if(!cell.text()) {
      // Checks if the cell is empty
      cell.text(symbol);
      // Plays click sound
      $("#click")[0].play();
      cell.animate({
        fontSize: "9rem"
      }, 200);
      return true;
    } else {
      $("#beep")[0].play();
      return false;
    }
    // if(cell.text()) {
    //   // Checks if cell is not empty
    //   $("#beep")[0].play();
    // } else {
    //   cell.text(symbol);
    //   // Plays click sound
    //   $("#click")[0].play();
    //   // cell.animate({
    //   //   fontSize: "9rem"
    //   // }, 0);
    // }
  }
}
