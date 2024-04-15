const OPERATORS = "+-*/^~";

let theOperationArray = [];
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
  theOperationArray = "";
  theAccumulatorValue = "";
}

/**
 * Populates theOperationArray with values to perform calculator operations
 * @param {any} value
 * @returns {any}
 */
function adToOperationArray(value) {
  //TODO: check if last value is an operator, and update operator instead of pushing new
  theOperationArray.push(value);
}

/**
 * Complete the calculator operation based on the values passed by user actions from the operationArray
 * @param {any} operationArray
 * @returns {any}
 */
function operate(operationArray) {
  //split the number values and the operator
  let operator = "";

  operationArray.forEach((value) => {
    if (OPERATORS.includes(value)) {
      operator = value;
    }
  });
  console.log(operator);

  const operatorIndex = operationArray.indexOf(operator);

  const num1 = Number(operationArray.slice(0, operatorIndex).join(""));
  let num2 = "";

  if (operator !== "^" && operator !== "~") {
    num2 = Number(
      operationArray.slice(operatorIndex + 1, operationArray.length).join("")
    );
  }

  console.log(num1 + " " + num2);

  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else if (operator === "^") {
    return square(num1);
  } else if (operator === "~") {
    return changeSign(num1);
  }

  // TODO
  //if accumulator = "", then use two given values, if not, use accumulator value.
  //check if last key press was = or an operator, then submit the same "operator num2" function on the accumulator value
}

const operationTestArray = [3, 0, "+", 0];
console.log(operate(operationTestArray));
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
