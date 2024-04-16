const OPERATORS = "+-*/^~";

let theOperationArray = [];
let thePreviousOperation = [];
let theAccumulatorValue = "";
let isOperatorInArray = false;

const btnDecimal = document.querySelector("#btnDecimal");
let txtOperationDisplay = document.querySelector("#operationDisplay");
let txtResult = document.querySelector("#result");

const allCalcBtns = document.querySelectorAll(".calcBtn");

Array.from(allCalcBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(`clicked ${btn.innerText}`);
    if (btn.innerText === "+/-") {
      addToOperationArray("~");
      operate(theOperationArray);
    } else if (btn.innerText === "x2") {
      addToOperationArray("^");
      operate(theOperationArray);
    } else if (btn.innerText === "=") {
      operate(theOperationArray);
    } else if (btn.innerText === "CE") {
      clear();
    } else {
      addToOperationArray(btn.innerText);
    }
  });
});

// ----------------------------------------------------CALCULATOR OPERATIONS--------------------------------------------------------------------------------------------------------
// ------------------ BASIC FUNCTIONS --------------------------------

/**
 * Adds the given numbers
 * @param {any} num1
 * @param {any} num2
 * @returns {any}
 */
function add(num1, num2) {
  return num1 + num2;
}

/**
 * Subtracts the given numbers
 * @param {any} num1
 * @param {any} num2
 * @returns {any}
 */
function subtract(num1, num2) {
  return num1 - num2;
}

/**
 * Multiplies the given numbers
 * @param {any} num1
 * @param {any} num2
 * @returns {any}
 */
function multiply(num1, num2) {
  return num1 * num2;
}

/**
 * Divides the given numbers. Alerts the user if they attempt to divide by 0
 * @param {any} num1
 * @param {any} num2
 * @returns {any}
 */
function divide(num1, num2) {
  if (num2 === 0) {
    alert("Oops! You cannot divide by 0!");
    clear();
    return "";
  } else {
    return num1 / num2;
  }
}

/**
 * Clears all calculator values and calculator screen
 * @returns {any}
 */
function clear() {
  clearOperationArray();
  theAccumulatorValue = "";
  txtOperationDisplay.innerHTML = " ";
  txtResult.innerHTML = " ";
}

/**
 * Clears only theOperationArray
 * @returns {any}
 */
function clearOperationArray() {
  theOperationArray = [];
  isOperatorInArray = false;
  btnDecimal.classList.remove("decimalClicked");
  btnDecimal.classList.add("decimalDefault");
}

/**
 * Populates theOperationArray with values to perform calculator operations
 * @param {any} value
 * @returns {any}
 */
function addToOperationArray(value) {
  // check if the user is stringing a larger operation before hitting equal
  if (
    isOperatorInArray === true &&
    theOperationArray.length > 0 &&
    OPERATORS.includes(value)
  ) {
    operate(theOperationArray);
  }

  theOperationArray.push(value);

  if (OPERATORS.includes(value)) {
    isOperatorInArray = true;
  } else if (value === ".") {
    btnDecimal.classList.add("decimalClicked");
    btnDecimal.classList.remove("decimalDefault");
  }

  // do not display sign change operator, user can see the sign change in result window
  if (!(value === "~")) {
    txtOperationDisplay.innerHTML += value + " ";
  }

  console.log(theOperationArray);
  console.log(isOperatorInArray);
}

/**--------------------------------------------------OPERATE-------------------------------------------------------------------------------
 * Complete the calculator operation based on the values passed by user actions from the operationArray
 * @param {any} operationArray
 * @returns {any}
 */
function operate(operationArray) {
  console.log("Prev Op: " + thePreviousOperation);

  // if the user hits equals before an operator, just save full entered number
  if (isOperatorInArray === false) {
    theAccumulatorValue = Number(operationArray.join(""));
    clearOperationArray();
    console.log(theAccumulatorValue);
    txtResult.innerHTML = theAccumulatorValue;
    return theAccumulatorValue;
  }

  //split the number values and the operator
  let operator = "";

  operationArray.forEach((value) => {
    if (OPERATORS.includes(value)) {
      operator = value;
    }
  });
  console.log(operator);

  let operatorIndex = "";

  let num1 = "";
  let num2 = "";

  //checks if the calculation is a continuation of the previous one, uses saved theAccumulatorValue to perform next operation
  if (theAccumulatorValue !== "" && operationArray.indexOf(operator) === 0) {
    console.log("case: continuation");
    num1 = theAccumulatorValue;
  } else {
    console.log("case: fresh calc");
    operatorIndex = operationArray.indexOf(operator);
    num1 = Number(operationArray.slice(0, operatorIndex).join(""));
  }

  // checks if operation is square or changeSign, which only require one parameter
  if (operator !== "^" && operator !== "~") {
    num2 = Number(
      operationArray.slice(operatorIndex + 1, operationArray.length).join("")
    );
  }

  //if theOparray is empty, meaning the user presses = again immediately, perform (non empty) previousOperation on accum
  if (operationArray.length === 0 && thePreviousOperation.length !== 0) {
    console.log("case: perform same op");
    thePreviousOperation.forEach((value) => {
      if (OPERATORS.includes(value)) {
        operator = value;
      }
    });

    operatorIndex = thePreviousOperation.indexOf(operator);
    console.log("index " + operatorIndex);
    num1 = theAccumulatorValue;
    num2 = Number(
      thePreviousOperation
        .slice(operatorIndex + 1, thePreviousOperation.length)
        .join("")
    );

    if (operator !== "^" && operator !== "~") {
      num2 = Number(
        thePreviousOperation
          .slice(operatorIndex + 1, thePreviousOperation.length)
          .join("")
      );
    }
  }

  console.log(num1 + " " + num2);

  if (operator === "+") {
    theAccumulatorValue = add(num1, num2);
  } else if (operator === "-") {
    theAccumulatorValue = subtract(num1, num2);
  } else if (operator === "*") {
    theAccumulatorValue = multiply(num1, num2);
  } else if (operator === "/") {
    theAccumulatorValue = divide(num1, num2);
  } else if (operator === "^") {
    theAccumulatorValue = square(num1);
  } else if (operator === "~") {
    theAccumulatorValue = changeSign(num1);
  }
  thePreviousOperation = operationArray;
  clearOperationArray();
  console.log(theAccumulatorValue);
  txtResult.innerHTML = theAccumulatorValue;
  return theAccumulatorValue;

  // TODO:
  //clear up operationarray values redundancy & see if "fresh calc" case can be skipped on "same op" cond.
  //number resets when = is pressed multiple times in a row
  //accumulator is not used when adding a decimal after performing an operation
}

// ----------------- EXTRA FUNCTIONS ------------------------------------

/**
 * Squares the given number (number multiplied by itself)
 *      Uses ^ as operator string value
 * @param {any} num
 * @returns {any}
 */
function square(num) {
  return num * num;
}

/**
 * Changes the sign of the given number. Negative numbers become positive, poistive become negative.
 *      Uses ~ as operator string value
 * @param {any} num
 * @returns {any}
 */
function changeSign(num) {
  return num * -1;
}
