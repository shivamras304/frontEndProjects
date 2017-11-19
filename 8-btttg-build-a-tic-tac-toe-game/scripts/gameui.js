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
        // Important to remove event listeners on the board cells
        // otherwise they would be triggered when AI inserts its moves
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
  },

  switchViewToHumanWins: function() {
    ui.switchViewToResult(
      `${globals.game.humanPlayer.getName()} Wins`,
      ui.getWinningSequence()
    );
  },

  switchViewToAIWins: function() {
    ui.switchViewToResult(
      `${globals.game.aiPlayer.getName()} Wins`,
      ui.getWinningSequence()
    );
  },

  switchViewToDraw: function() {
    ui.switchViewToResult("DRAW!");
  },

  switchViewToResult: function(message, winningSequence) {
    if(winningSequence) {
      winningSequence.forEach(function(pos) {
        $(`#game-screen #cell-${pos}`).css("backgroundColor", "black");
      });
    }

    $("#board-container #player1-turn").animate({
      top: 0
    }, 200);
    $("#board-container #player2-turn").animate({
      top: 0
    }, 200);

    window.setTimeout(function() {
      $("#board-screen").append(
        `
        <div id="result-screen" class="screen-container">
          <p class="screen-heading">${message}</p>
        </div>
        `
      )

      $("#result-screen").animate(
        {
          opacity: 1
        },
        1000,
        function() {
          window.setTimeout(globals.loadGameScreen, 1000);
        }
      );

    }, 500);
  },

  getWinningSequence: function() {
    var B = globals.game.currentState.board;
    //check rows
    for(var i = 0; i <= 6; i = i + 3) {
      if(B[i] !== GameState.BOARD_EMPTYCELL && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
        return [i, i + 1, i + 2];
      }
    }

    //check columns
    for(var i = 0; i <= 2 ; i++) {
      if(B[i] !== GameState.BOARD_EMPTYCELL && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
        return [i, i + 3, i + 6];
      }
    }

    //check diagonals
    for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
      if(B[i] !== GameState.BOARD_EMPTYCELL && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
        return [i, i + j, i + 2*j];
      }
    }
  }

}
