//create an object to track values
const Calculator = {
    //display 0 on screen
    Display_Value: '0',
    //hold first operand for expressions, set to null by default
    First_Operand: null,
    //check for second operand input
    Wait_Second_Operand: false,
    //holds operator, set to null by default
    operator: null
};

//modify values for each button click
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;
    //check to see if Wait_Second_Operand true and set 
    //Display_Value to the button clicked
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        //overwrite Display_Value if current value is 0
        //otherwise adds onto it
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}

//function to handle decimal points
function Input_Decimal(dot) {
    //ensures accidental multiple click of decimal point does not
    //cause bugs in operation
    if (Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        //if Display_Value does not include a decimal, we want to add one
        Calculator.Display_Value += dot; 
    }
}

//section to handle operators
function Handle_Operator(Next_Operator) {
    const { First_Operand, Display_Value, operator} = Calculator
    //when operator key is pressed, we convert the current number
    //displayed on screen to a number and then store the result in
    //Calculator.First_Operand if it doesn't exist already
    const Value_Of_Input = parseFloat(Display_Value);
    //check if operator already exists and if Wait_Second_Operand is true,
    //then updates operator and exits function
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_Of_Input;
    } else if (operator) { //check if operator already exists
        const Value_Now = First_Operand || 0;
        //if operator exists, property lookup performed for it
        //in the Perform_Calculation object and function that matches 
        //is executed
        const result = Perform_Calculation[operator](Value_Now, Value_Of_Input);

        Calculator.Display_Value = String(result);
        Calculator.First_Operand = result;
    }

    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation = {
    '/' : (First_Operand, Second_Operand) => First_Operand / Second_Operand,

    '*' : (First_Operand, Second_Operand) => First_Operand * Second_Operand,

    '+' : (First_Operand, Second_Operand) => First_Operand + Second_Operand,

    '-' : (First_Operand, Second_Operand) => First_Operand - Second_Operand,

    '=' : (First_Operand, Second_Operand) => Second_Operand
};

//function to clear all values and reset
function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

//update display with contents of Display_Value
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display();

//monitor button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //target variable is an object representing the element clicked
    const { target } = event;
    //if element clicked is not a button, exit function
    if (!target.matches('button')) {
        return;
    }
    
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    //ensure AC clears numbers from calculator
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
})
