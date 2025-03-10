document.addEventListener("DOMContentLoaded", function () {
  const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function updateDisplay() {
    const display = document.querySelector("#calculator-screen");
    display.value = calculator.displayValue;
  }

  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue =
        displayValue === "0" ? digit : displayValue + digit;
    }

    updateDisplay();
  }

  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;

    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }

    updateDisplay();
  }

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand && operator !== "^2") {
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);

      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = nextOperator !== "^2";
    calculator.operator = nextOperator;

    updateDisplay();
  }

  function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      case "%":
        return firstOperand % secondOperand;
      case "^2":
        return firstOperand * firstOperand;
      default:
        return secondOperand;
    }
  }

  function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;

    updateDisplay();
  }

  document
    .querySelector(".calculator-keys")
    .addEventListener("click", (event) => {
      const { target } = event;

      if (!target.matches("button")) {
        return;
      }

      if (target.classList.contains("operator")) {
        handleOperator(target.value);
        return;
      }

      if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        return;
      }

      if (target.classList.contains("all-clear")) {
        resetCalculator();
        return;
      }

      inputDigit(target.value);
    });
});
