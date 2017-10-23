
window.onload = function() {
  var calcResult = document.querySelector("#calc-result");
  var calcExpression = document.querySelector("#calc-expression");

  var ac = document.querySelector("#ac");
  var ce = document.querySelector("#ce");
  var equals = document.querySelector("#equals");
  var decimal = document.querySelector("#decimal");

  //The following variables have been initialized with values for fresh
  //state of the calculator
  var result=0;
  var expressionString = "0";
  var expressionArray = [];
  var resultString = "0";
  //Is last expression an operand?
  var isLastExpOp = false;
  var isDecimal = false;

  var lastOperation; //undefined by default
  var lastNumber = 0;

  window.clickNumber = function(target) {
    if(expressionString === "0") {
      //If the calculator is in fresh state
      //Accept any number but zero
      //Nothing has to be pushe on the expressionArray
      if(target.id !== "zero") {
        expressionString = target.innerText;
        resultString = target.innerText;
      } else return;

    } else if(!isLastExpOp && !isDecimal) {
      //If the last input to the experession was a non-decimal number only
      //Nothing has to be pushe on the expressionArray
      if(lastNumber) {
        //If the lastNumber was not zero
        expressionString += target.innerText;
        resultString += target.innerText;
      } else {
        //If the lastNumber was zero
        expressionString = expressionString.substring(0, expressionString.length-1) + target.innerText;
        resultString = target.innerText;
      }
    } else if(!isLastExpOp && isDecimal) {
      //If the last input to the experession was a decimal number only
      //Nothing has to be pushe on the expressionArray
      expressionString += target.innerText;
      resultString += target.innerText;
    } else if(isLastExpOp) {
      //If the last input to the expression was an operation only
      //The operation has to be pushed to the expressionArray
      if(lastOperation === "divide" && target.id === "zero") {
        return;
      }
      expressionArray.push(lastOperation);
      lastOperation = undefined;
      expressionString += target.innerText;
      resultString = target.innerText;
    }

    calcExpression.innerText = expressionString;
    calcResult.innerText = resultString;

    if(!isDecimal) {
      lastNumber = lastNumber*10 + Number(target.innerText);
    } else {
      var decimalForm = Number(lastNumber + "." + target.innerText);
      if(isNaN(decimalForm)) {
        lastNumber = Number(lastNumber + target.innerText);
      } else {
        lastNumber = decimalForm;
      }
    }
    isLastExpOp = false;

    console.log(expressionArray);
  }

  window.clickOperation = function(target) {

    if(expressionString === "0" && target.id === "subtract") {
      //If the calculator is in fresh state
      //Accept only minus operator
      //The number zero has to be pushed on the array
      expressionString = target.innerText;
      resultString = target.innerText;
      expressionArray.push(0);
      lastNumber = 0;
    } else if(isLastExpOp) {
      //If the last input to the expression was an operation only
      //If there is only a subtract operation, don't replace it
      if(!expressionArray[0] && lastOperation === "subtract") {
        return;
      }
      expressionString = expressionString.substring(0, expressionString.length-1) + target.innerText;
      resultString = target.innerText;
    } else if(!isLastExpOp) {
      //If the last input to the expression was a number
      //Push the number to the expression array
      expressionArray.push(lastNumber);
      lastNumber = 0;
      isDecimal = false;
      expressionString += target.innerText;
      resultString = target.innerText;
    }

    calcExpression.innerText = expressionString;
    calcResult.innerText = resultString;

    lastOperation = target.id;

    isLastExpOp = true;

    console.log(expressionArray)
  }

  decimal.addEventListener("click", function() {
    if(!isDecimal) {
      if(expressionString === "0") {
        expressionString = "0."
        resultString = "0.";
      } else if(isLastExpOp) {
        expressionString += "0."
        resultString = "0.";
      } else {
        expressionString += ".";
        resultString += ".";
      }

      calcExpression.innerText = expressionString;
      calcResult.innerText = resultString;

      isLastExpOp = false;
      isDecimal = true;
    }
  })

  ac.addEventListener("click", function() {
    allClear();
    console.log(expressionArray);
  })

  ce.addEventListener("click", function() {
    cancelEntry();
    allClear();
  })

  equals.addEventListener("click", function() {
    if(expressionString.length <= 2) {
      allClear();
      return;
    }
    topUpExpressionArray();

    calculateResult();
    showResult();

    console.log(expressionArray);
  })

  function topUpExpressionArray() {
    if(lastNumber) {
      expressionArray.push(lastNumber);
    }
  }

  function allClear() {
    result=0;
    expressionString = "0";
    expressionArray = [];
    resultString = "0";
    lastOpIndex = -1;
    //Is last expression an operand?
    isLastExpOp = false;
    isDecimal = false;

    lastOperation = undefined; //undefined by default
    lastNumber = 0;

    calcResult.innerText = resultString;
    calcExpression.innerText = expressionString;
  }

  function cancelEntry() {
    //TODO to be added later
    // if(isLastExpOp) {
    //   //The last added entry was an operation
    //   lastOperation = undefined;
    //   isLastExpOp = false;
    //   lastNumber = expressionArray[]
    // } else {
    //   //The last added entry was a number
    // }
  }

  function calculateResult() {
    for(var i = 0; i < expressionArray.length - 2; i = i+2) {
      switch (expressionArray[i+1]) {
        case "add":
          expressionArray[i+2] = expressionArray[i] + expressionArray[i+2];
          break;
        case "subtract":
          expressionArray[i+2] = expressionArray[i] - expressionArray[i+2];
          break;
        case "multiply":
          expressionArray[i+2] = expressionArray[i] * expressionArray[i+2];
          break;
        case "divide":
          expressionArray[i+2] = expressionArray[i] / expressionArray[i+2];
          break;
      }
    }
    result = expressionArray[expressionArray.length-1];
  }

  function showResult() {
    resultString = "" + result;
    expressionString += " = " + result;

    calcExpression.innerText = expressionString;
    calcResult.innerText = resultString;
  }
}
