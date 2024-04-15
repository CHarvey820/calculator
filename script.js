const OPERATORS = "+-*/^~";

let theOperationArray = [];
let thePreviousOperation = [];
let theAccumulatorValue = "";

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
  theOperationArray = [];
  theAccumulatorValue = "";
}

/**
 * Clears only theOperationArray
 * @returns {any}
 */
function clearOperationArray() {
  theOperationArray = [];
}

/**
 * Populates theOperationArray with values to perform calculator operations
 * @param {any} value
 * @returns {any}
 */
function addToOperationArray(value) {
  //TODO: check if last value is an operator, and update operator instead of pushing new
  theOperationArray.push(value);
}

/**
 * Complete the calculator operation based on the values passed by user actions from the operationArray
 * @param {any} operationArray
 * @returns {any}
 */
function operate(operationArray) {
  console.log("Prev Op: " + thePreviousOperation);
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
  return theAccumulatorValue;

  // TODO:
  //clear up operationarray values redundancy & see if "fresh calc" case can be skipped on "same op" cond.
}

const operationTestArray = [6, 0, "+", 3];
console.log(operate(operationTestArray));
const operationTestArray2 = [2, "*", 2];
console.log(operate(operationTestArray2));
const operationTestArray3 = ["-", 1];
console.log(operate(operationTestArray3));
const operationTestArray4 = [];
console.log(operate(operationTestArray4));
// console.log(operate("3+"));

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
