//Global object to hold all game related data
var globals = {};

$(window).on("load", readyFunction);
function readyFunction() {
  var boardScreen = $("#board-screen");
  var popSound = $("#pop")[0];
  var clickSound = $("#click")[0];

  // Onclick Reset button
  function resetAll() {
    globals = {};
    boardScreen.empty();
    loadTitleScreen();
  }

  /*
   * The flow of the board is as follows :
   * 1. Title Screen
   * 2. Name Screen
   * 3. Level Screen
   * 4. Symbol Screen
   * 5. Game Screen
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
                window.setTimeout(loadNameScreen, 1000);
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
    var inputName = $("#name-screen #player-name");
    inputName.on("keypress", function(e) {
      if(e.which === 13) {
        globals.playerName = inputName.val() || "Human";
        loadLevelScreen();
      }
    })

    boardScreen.children().animate({
      opacity: 1
    }, 1000);
  }

  /*
   * Takes input of AI level
   * Default Level is "Novice"
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
      loadSymbolScreen();
    })
    boardScreen.children().animate({
      opacity: 1
    }, 1000);
  }

  /*
   * Takes input of player Symbol
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
    var symbols = $("#symbol-screen .chosen-symbol");
    symbols.on("click", function(e) {
      globals.playerSymbol = e.target.id === "chosen-symbol-X" ? "X" : "O";
      loadGameScreen();
    })
    boardScreen.children().animate({
      opacity: 1
    }, 1000);
  }

  /*
   */
  function loadGameScreen() {
    boardScreen.empty();
    boardScreen.append(
      // TODO some error here in the second horizontal divider
      `
      <div id="game-screen" class="screen-container">
        <div id="cell-0" class="cell"></div>
        <div class="vertical-divider"></div>
        <div id="cell-1" class="cell"></div>
        <div class="vertical-divider"></div>
        <div id="cell-2" class="cell"></div>
        <div class="horizontal-divider"></div>
        <div id="cell-3" class="cell"></div>
        <div id="cell-4" class="cell"></div>
        <div id="cell-5" class="cell"></div>
        <div class="horizontal-divider horizontal-divider2"></div>
        <div id="cell-6" class="cell"></div>
        <div id="cell-7" class="cell"></div>
        <div id="cell-8" class="cell"></div>
      </div>
      `
    );
    boardScreen.children().animate({
      opacity: 1
    }, 1000);
    console.log("Hell")
  }

  $("#reset").on("click", function() {
    resetAll();
  })

  resetAll();
}
