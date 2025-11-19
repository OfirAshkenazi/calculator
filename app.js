const resultDisplay = document.querySelector('.result span');
let equation = [];
let currentInput = "";
let justEvaluated = false;


function updateDisplay() {
  const parts = [...equation];
  if (currentInput !== "") parts.push(currentInput);
  resultDisplay.textContent = parts.join(" ") || "0";
}

function onNumberClick(digit) {
  if (justEvaluated) {
    equation = [];
    currentInput = "";
    justEvaluated = false;
  }
  if (digit === ".") {
    if (currentInput.includes(".")) return;
    if (currentInput === "") currentInput = "0.";
    else currentInput += ".";
  } else {
    if (currentInput === "0") currentInput = digit;
    else currentInput += digit;
  }
  updateDisplay();
}


function onOperatorClick(op) {
  if (currentInput === "" && op !== "-") {
    return; 
  }
  if (currentInput !== "") {
    equation.push(currentInput);
    currentInput = "";
  }
  const last = equation[equation.length - 1];
  const ops = ["+", "-", "×", "÷"];
  if (ops.includes(last)) {
    equation[equation.length - 1] = op;
  } else {
    equation.push(op);
  }
  justEvaluated = false;
  updateDisplay();
}


function onActionClick(action) {
  if (action === "ac") {
    currentInput = "";
    equation = [];
    justEvaluated = false;
  } else if (action === "plusMinus") {
    if (currentInput !== "") {
      currentInput = (-parseFloat(currentInput)).toString();
    }
  } else if (action === "percent") {
    if (currentInput !== "") {
      currentInput = (parseFloat(currentInput) / 100).toString();
    }
  }
  updateDisplay();
}


function onEqualClick() {
  if (currentInput !== "") equation.push(currentInput);
  const last = equation[equation.length - 1];
  const ops = ["+", "-", "×", "÷"];
  if (ops.includes(last)) equation.pop();
  if (equation.length < 3) return; // אין מה לחשב
  const result = computeEquation(equation);
  currentInput = result.toString();
  equation = [];
  justEvaluated = true;
  updateDisplay();
}


function computeEquation(eq) {
  let arr = eq.slice();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "×" || arr[i] === "÷") {
      const a = parseFloat(arr[i - 1]);
      const b = parseFloat(arr[i + 1]);
      let val;
      if (arr[i] === "×") {
        val = a * b;
      } else {
        val = a / b;
      }
      arr.splice(i - 1, 3, val.toString());

      i -= 1;
    }
  }
  let result = parseFloat(arr[0]);
  for (let i = 1; i < arr.length; i += 2) {
    const op = arr[i];
    const num = parseFloat(arr[i + 1]);

    if (op === "+") {
      result = result + num;
    } else if (op === "-") {
      result = result - num;
    }
  }
  return result;
}



function addListeners() {

  ["zero", "num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9"]
  .forEach(id => {
    const el = document.getElementById(id);
    let digit;
    if (id === "zero") {
      digit = "0";
    } else {
      digit = id.replace("num", "");
    }
    el.addEventListener("click", () => onNumberClick(digit));
  });



  document.getElementById("dot").addEventListener("click", () => onNumberClick("."));


  document.getElementById("plus").addEventListener("click", () => onOperatorClick("+"));
  document.getElementById("minus").addEventListener("click", () => onOperatorClick("-"));
  document.getElementById("multiply").addEventListener("click", () => onOperatorClick("×"));
  document.getElementById("divide").addEventListener("click", () => onOperatorClick("÷"));


  document.getElementById("ac").addEventListener("click", () => onActionClick("ac"));
  document.getElementById("plusMinus").addEventListener("click", () => onActionClick("plusMinus"));
  document.getElementById("percent").addEventListener("click", () => onActionClick("percent"));


  document.getElementById("equals").addEventListener("click", onEqualClick);
}


addListeners();
updateDisplay();



// סקרול לתרגיל ארוך, לטפל בנקודה 0.1 להעביר לוגיקה לפונקציה קיימת, לפטל בספרות עשרוניות אחרי הנקודה (גם לתוצאה)
// להגביל את התצוגה האופקית של מספרים ארוכים
// להזיז את ספרת התוצאה יותר שמאלה, להגדיל פדינג
// ללא eval
// ללא replace
// להוציא ליסנרס מהפונקציה

