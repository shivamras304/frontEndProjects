window.onload = function() {

  var breakLengthDisplay = document.querySelector("#length-break");
  var sessionLengthDisplay = document.querySelector("#length-session");

  var clockHeading = document.querySelector("#clock-heading");
  var clockTime = document.querySelector("#clock-time");

  var clock = document.querySelector("#clock");
  var resetButton = document.querySelector("#reset");

  var isClockRunning = false;
  var isSession = true;
  var timerId;

  //These values should be the same as in the html code
  //The following two variables will only be altered manually
  var breakLength = 5;
  var sessionLength = 25;

  //The following two variable will be altered in code
  var breakLengthSecs = breakLength * 60;
  var sessionLengthSecs = sessionLength * 60;

  var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/sirens/big_bell.wav");

  window.setBreakLength = function(target) {
    if (isClockRunning) return;

    if (target.id === "up-break") {
      breakLength++;
    } else if (breakLength > 1) {
      breakLength--;
    }

    breakLengthDisplay.innerText = breakLength;
    breakLengthSecs = breakLength * 60;
  }

  window.setSessionLength = function(target) {
    if (isClockRunning) return;

    if (target.id === "up-session") {
      sessionLength++;
    } else if (sessionLength > 1) {
      sessionLength--;
    }
    sessionLengthDisplay.innerText = sessionLength;
    sessionLengthSecs = sessionLength * 60;
  }

  function startClock() {
    clockTime.className = "";
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
    clockTime.innerText = getClockTime(sessionLengthSecs);
    timerId = setInterval(function() {
      sessionLengthSecs--;
      clockTime.innerText = getClockTime(sessionLengthSecs);;
      if (sessionLengthSecs === 0) {
        clearInterval(timerId);
        isSession = false;
        sessionLengthSecs = sessionLength * 60;
        sound.play();
        startBreak();
      }
    }, 1000);
  }

  function startBreak() {
    isSession = false;
    isClockRunning = true;
    clockHeading.innerText = "Break";
    clockTime.innerText = getClockTime(breakLengthSecs);
    timerId = setInterval(function() {
      breakLengthSecs--;
      clockTime.innerText = getClockTime(breakLengthSecs);
      if (breakLengthSecs === 0) {
        clearInterval(timerId);
        isSession = true;
        breakLengthSecs = breakLength * 60;
        sound.play();
        startSession();
      }
    }, 1000);
  }

  function resetClock() {
    clearInterval(timerId);

    clockTime.className = "hide"
    clockTime.innerText = sessionLength;
    clockHeading.innerText = "Session"

    breakLengthSecs = breakLength * 60;
    sessionLengthSecs = sessionLength * 60;

    isClockRunning = false;
    isSession = true;

    timerId = undefined;
  }

  function getClockTime(seconds) {
    var hours, mins;
    if (seconds < 60) {
      return seconds;
    } else if (seconds < 3600) {
      mins = Math.floor(seconds / 60);
      seconds = seconds % 60;
      seconds = Math.round((seconds) * 100) / 100;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return mins + ":" + seconds;
    } else {
      hours = Math.round(seconds / 3600);
      seconds = seconds % 3600;
      mins = Math.round(seconds / 60);
      if (mins < 10) {
        mins = "0" + mins;
      }
      seconds = seconds % 60;
      seconds = Math.round((seconds) * 100) / 100;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + mins + ":" + seconds;
    }
  }

  resetButton.addEventListener("click", resetClock);

  clock.addEventListener("click", function() {
    isClockRunning = !isClockRunning;
    isClockRunning ? startClock() : pauseClock();
  })
};
