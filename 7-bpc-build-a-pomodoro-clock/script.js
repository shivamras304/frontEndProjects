

window.onload = function() {

  var breakLength = 5;
  var sessionLength = 10;

  var breakLengthDisplay = document.querySelector("#length-break");
  var sessionLengthDisplay = document.querySelector("#length-session");

  var clockHeading = document.querySelector("#clock-heading");
  var clockTime = document.querySelector("#clock-time");

  var playPauseButton = document.querySelector("#play-pause");
  var resetButton = document.querySelector("#reset");

  var isClockRunning = false;
  var isSession = true;
  var timerId;

  var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/sirens/big_bell.wav");

  window.setBreakLength = function(target) {
    resetClock();
    if(target.id === "up-break") {
      breakLength++;
    } else if(breakLength > 1){
      breakLength--;
    }
    breakLengthDisplay.innerText = breakLength;
  }

  window.setSessionLength = function(target) {
    resetClock();
    if(target.id === "up-session") {
      sessionLength++;
    } else if(sessionLength > 1){
      sessionLength--;
    }
    sessionLengthDisplay.innerText = sessionLength;
  }

  function startClock() {
    isSession ? startSession() : startBreak();
  }

  function pauseClock() {
    isClockRunning = false;
    clearInterval(timerId);
  }

  function startSession() {
    isSession = true;
    isClockRunning = true;
    clockHeading.innerText = "Session";
    clockTime.innerText = sessionLength;
    timerId = setInterval(function() {
      sessionLength--;
      clockTime.innerText = sessionLength;
      if(sessionLength === 0) {
        clearInterval(timerId);
        isSession = false;
        sessionLength = Number(sessionLengthDisplay.innerText);
        sound.play();
        startBreak();
      }
    }, 60*1000);
  }

  function startBreak() {
    isSession = false;
    isClockRunning = true;
    clockHeading.innerText = "Break";
    clockTime.innerText = breakLength;
    timerId = setInterval(function() {
      breakLength--;
      clockTime.innerText = breakLength;
      if(breakLength === 0) {
        clearInterval(timerId);
        isSession = true;
        breakLength = Number(breakLengthDisplay.innerText);
        sound.play();
        startSession();
      }
    }, 60*1000);
  }

  function resetClock() {
    clearInterval(timerId);

    breakLength = 5;
    sessionLength = 10;
    breakLengthDisplay.innerText = breakLength;
    sessionLengthDisplay.innerText = sessionLength;
    clockTime.innerText = sessionLength;
    clockHeading.innerText = "Session"

    isClockRunning = false;
    isSession = true;
  }

  resetButton.addEventListener("click", resetClock);

  playPauseButton.addEventListener("click", function() {
    isClockRunning = !isClockRunning;
    isClockRunning? startClock() : pauseClock();
  })
};
