//Global object to hold all game related data
var globals = {
  // gameLevel: 2,
  // playerName: "Shivam",
  // playerSymbol: "X"
};

$(window).on("load", readyFunction);
function readyFunction() {
  var boardScreen = $("#board-screen");
  var levelDisplay = $("#level");
  var resetDisplay = $("#reset");
  var playerTurnIndicator = $("#player2-turn");
  var computerTurnIndicator = $("#player1-turn");
  var popSound = $("#pop")[0];

  // Onclick Reset button
  function resetAll() {
    globals = {
      // gameLevel: 2,
      // playerName: "Shivam",
      // playerSymbol: "X"
    };
    boardScreen.empty();
    resetDisplay.css("display", "none");
    levelDisplay.text("");
    levelDisplay.css("display", "none");
    computerTurnIndicator.animate({
      top: 0
    }, 700);
    playerTurnIndicator.animate({
      top: 0
    }, 700, function() { playerTurnIndicator.text("Human"); });
    loadTitleScreen();
  }

  /*
   * The flow of the board is as follows :
   * 1. Title Screen
   * 2. Name Screen
   * 3. Level Screen
   * 4. Symbol Screen
   * 5. Game Screen
   * After a game has finished, Game Screen will be loaded again
   * and this loops indefinitely
   * Clicking Reset loads the Title Screen
   */

  // Plays a small title animation and then loads NameScreen
  function loadTitleScreen() {
    boardScreen.append(
      `
      <div id="title-screen" class="screen-container">
        <p class="screen-heading">TIC</p>
        <p class="screen-heading">TAC</p>
        <p class="screen-heading">TOE</p>
      </div>
      `
    )
    boardScreen.children().css("opacity", 1)
    var ticTacToeTitles = $("#title-screen p.screen-heading");
    popSound.play();
    jQuery(ticTacToeTitles[0]).animate(
      {
        fontSize: "3.4rem"
      },
      700,
      function() {
        popSound.play();
        jQuery(ticTacToeTitles[1]).animate(
          {
            fontSize: "3.4rem"
          },
          700,
          function() {
            popSound.play();
            jQuery(ticTacToeTitles[2]).animate(
              {
                fontSize: "3.4rem"
              },
              700,
              function() {
                boardScreen.children().animate({
                  opacity: 0
                }, 500, loadNameScreen);
              }
            );
          }
        );
      }
    );
    // jQuery(ticTacToeTitles[0]).animate(
    //   {
    //     fontSize: "3.4rem"
    //   },
    //   1000
    // );
    // jQuery(ticTacToeTitles[1]).animate(
    //   {
    //     fontSize: "3.4rem"
    //   },
    //   1000
    // );
    // jQuery(ticTacToeTitles[2]).animate(
    //   {
    //     fontSize: "3.4rem"
    //   },
    //   1000
    // );
  }

  /*
   * Takes input of player Name
   * Default name is "Human"
   * Loads LevelScreen
   */
  function loadNameScreen() {
    boardScreen.empty();
    boardScreen.append(
      `
      <div id="name-screen" class="screen-container">
        <label class="screen-heading">What's your name?</label>
        <input type="text" id="player-name" placeholder="John Doe" autofocus>
      </div>
      `
    );
    //////////////////////////////////////////////////////////////////////////
    boardScreen.children().animate({
      opacity: 1
    }, 1000);
    //////////////////////////////////////////////////////////////////////////
    var inputName = $("#name-screen #player-name");
    inputName.on("keypress", function(e) {
      if(e.which === 13) {
        globals.playerName = inputName.val() || "Human";

        boardScreen.children().animate({
          opacity: 0
        }, 500, loadLevelScreen);
      }
    })
  }

  /*
   * Takes input of AI level
   * Default Level is "Novice"
   * Shows Reset button
   * Changes player's name on turn indicator
   * Loads SymbolScreen
   */
  function loadLevelScreen() {
    boardScreen.empty();
    boardScreen.append(
      `
      <div id="level-screen" class="screen-container">
        <p class="screen-heading">Choose Level</p>
        <div>
          <span id="chosen-level-Blind" class="chosen-level">Blind</span>
          <span id="chosen-level-Novice" class="chosen-level">Novice</span>
          <span id="chosen-level-Master" class="chosen-level">Master</span>
        </div>
      </div>
      `
    );
    //////////////////////////////////////////////////////////////////////////
    resetDisplay.css({
      "display": "block",
      "opacity": 0
    });
    resetDisplay.animate({
      opacity: 1
    }, 1000);
    boardScreen.children().animate({
      opacity: 1
    }, 1000);

    playerTurnIndicator.text(globals.playerName);
    //////////////////////////////////////////////////////////////////////////
    var levels = $("#level-screen .chosen-level");
    levels.on("click", function(e) {
      globals.playerSymbol = e.target.id === "chosen-symbol-X" ? "X" : "O";
      switch(e.target.id) {
        case "chosen-level-Blind":
          globals.gameLevel = AIPlayer.LEVEL_BLIND;
          break;
        case "chosen-level-Novice":
          globals.gameLevel = AIPlayer.LEVEL_NOVICE;
          break;
        case "chosen-level-Master":
          globals.gameLevel = AIPlayer.LEVEL_MASTER;
          break;
        default: globals.gameLevel = AIPlayer.LEVEL_NOVICE;
      }

      boardScreen.children().animate({
        opacity: 0
      }, 500, loadSymbolScreen);
    })
  }

  /*
   * Takes input of player Symbol
   * Shows levelDisplay
   * Loads GameScreen
   */
  function loadSymbolScreen() {
    boardScreen.empty();
    boardScreen.append(
      `
      <div id="symbol-screen" class="screen-container">
        <p class="screen-heading">Would you like to be X or O?</p>
        <div>
          <span id="chosen-symbol-X" class="chosen-symbol">X</span>
          <span id="chosen-symbol-O" class="chosen-symbol">O</span>
        </div>
      </div>
      `
    );
    //////////////////////////////////////////////////////////////////////////
    levelDisplay.css({
      "display": "block",
      "opacity": 0
    });
    switch(globals.gameLevel) {
      case AIPlayer.LEVEL_BLIND:
        levelDisplay.text("Level: Blind");
        break;
      case AIPlayer.LEVEL_NOVICE:
        levelDisplay.text("Level: Novice");
        break;
      case AIPlayer.LEVEL_MASTER:
        levelDisplay.text("Level: Master");
        break;
    }
    levelDisplay.animate({
      opacity: 1
    }, 1000);
    boardScreen.children().animate({
      opacity: 1
    }, 1000);
    //////////////////////////////////////////////////////////////////////////
    var symbols = $("#symbol-screen .chosen-symbol");
    symbols.on("click", function(e) {
      globals.playerSymbol = e.target.id === "chosen-symbol-X" ? "X" : "O";

      boardScreen.children().animate({
        opacity: 0
      }, 500, loadGameScreen);
    })

  }

  /*
   * Instantiates the humanPlayer and aiPlayer and starts the game
   */
  function loadGameScreen() {
    globals.loadGameScreen = loadGameScreen;
    boardScreen.empty();
    boardScreen.append(
      // TODO some error here in the second horizontal divider
      `
      <div id="game-screen" class="screen-container">
        <div id="cell-0" class="cell" data-cell-no="0"></div>
        <div class="vertical-divider"></div>
        <div id="cell-1" class="cell" data-cell-no="1"></div>
        <div class="vertical-divider"></div>
        <div id="cell-2" class="cell" data-cell-no="2"></div>
        <div class="horizontal-divider"></div>
        <div id="cell-3" class="cell" data-cell-no="3"></div>
        <div id="cell-4" class="cell" data-cell-no="4"></div>
        <div id="cell-5" class="cell" data-cell-no="5"></div>
        <div class="horizontal-divider horizontal-divider2"></div>
        <div id="cell-6" class="cell" data-cell-no="6"></div>
        <div id="cell-7" class="cell" data-cell-no="7"></div>
        <div id="cell-8" class="cell" data-cell-no="8"></div>
      </div>
      `
    );
    //////////////////////////////////////////////////////////////////////////
    boardScreen.children().animate({
      opacity: 1
    }, 1000);
    //////////////////////////////////////////////////////////////////////////

    var humanPlayer = new GamePlayer(globals.playerSymbol, globals.playerName);

    var aiPlayer = new AIPlayer(
      globals.playerSymbol === "X" ? "O" : "X",
      "Computer",
      globals.gameLevel
    )
    globals.game = new Game(aiPlayer, humanPlayer);
    aiPlayer.plays(globals.game);
    globals.game.start();
  }

  $("#reset").on("click", function() {
    resetAll();
  })

  resetAll();
}
