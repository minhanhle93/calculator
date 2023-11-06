const operationbtn = document.querySelectorAll(".operator");
const digitsbtn = document.querySelectorAll(".digit");
const clearbtn = document.querySelector(".clear");
const equalsbtn = document.querySelector(".equals");
const lastOpScreen = document.querySelector('.lastOpScreen')
const currentOpScreen = document.querySelector('.currentOpScreen')

let operator = "";
let firstNum = 0;
let secondNum = 0;
let currentOp = null;
let resetScreen = false;

operationbtn.forEach(button => {
    button.addEventListener("click", () => setOperation(button.textContent));
});
  
digitsbtn.forEach(button => {
    button.addEventListener("click", () => appendDigits(button.textContent));
});
  
clearbtn.addEventListener("click", clear);
equalsbtn.addEventListener("click", evaluate);

function setOperation(operator) {
    if (currentOp != null) evaluate();
    firstNum = parseFloat(currentOpScreen.textContent);
    currentOp = operator;
    lastOpScreen.textContent = `${firstNum} ${currentOp}`
    resetScreen = true;
}

function appendDigits(num) {
    if (currentOpScreen.textContent === '0' || resetScreen) {
        reset();
    }
    currentOpScreen.textContent += num;
}

function reset() {
    currentOpScreen.textContent = "";
    resetScreen = false;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function evaluate() {
    if (currentOp == null || resetScreen) return;
    if (currentOp == "/" && currentOpScreen.textContent == "0") {
        alert("Try again, can't divide by 0");
    }
    secondNum = parseFloat(currentOpScreen.textContent);
    currentOpScreen.textContent = roundResult(operate(currentOp, firstNum, secondNum));
    lastOpScreen.textContent = `${firstNum} ${currentOp} ${secondNum} =`;
    currentOp = null;
}

function roundResult(num) {
    return Math.round(num * 1000) / 1000
}

function clear() {
    firstNum = "";
    secondNum = "";
    currentOp = null;
    currentOpScreen.textContent = "0";
    lastOpScreen.textContent = "";
}