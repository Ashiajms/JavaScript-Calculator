const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.display-screen');

keys.addEventListener('click', e => {
  if(e.target.matches('button')){
    const key = e.target;
    const action = key.dataset.action;
    const keyContext = key.textContent;
    const displayNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    //If the button clicked doesn't have a action dataset, it's a number
    if(!action) {
      if(displayNum === '0' || previousKeyType === 'operator'){
        display.textContent = keyContext;
      } else {
        display.textContent = displayNum + keyContext;
      }
    }
    //If the button clicked is a operator-key
    if (action === 'add' || action === 'substract' ||
        action === 'multiply' || action === 'divide') {

          calculator.dataset.previousKeyType = 'operator';
          calculator.dataset.firstValue = displayNum;
          calculator.dataset.operator = action;
        }
    //If the button clicked is a decimal key
    if (action === 'decimal') {
      if (!displayNum.includes('.')) {
          display.textContent = displayNum + '.'
    } else if (previousKeyType === 'operator') {
          display.textContent = '0.';
        }

      calculator.dataset.previousKeyType = 'decimal';
      }
//If the button clicked is a calculate key
  if (action === 'calculate') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayNum;

    const calculate = (n1, operator, n2) => {
      let result = '';

      if(operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
      } else if (operator === 'substract'){
        result = parseFloat(n1) - parseFloat(n2);
      } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
      } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
      }
      return result;
    }
    calculator.dataset.previousKeyType = 'calculate';
    display.textContent = calculate (firstValue, operator, secondValue);
  }
  if (action === 'all-clear') {
    display.textContent = '0';
  }
  if(action === 'percent') {
    display.textContent = displayNum / 100;
  }
  if(action === 'add/sub'){
    if(displayNum > 0) {
      display.textContent = '-' + displayNum;
    }
    if(displayNum < 0) {
      display.textContent = displayNum;
    }
  }

}
});
