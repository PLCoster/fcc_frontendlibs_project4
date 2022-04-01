import { useState, useEffect } from 'react';

import './Calculator.css';

import ButtonsDisplay from './ButtonsDisplay';

function Calculator() {
  const [formula, setFormula] = useState('');
  const [numOpenParens, setNumOpenParens] = useState(0);
  const [formulaClearNextUpdate, setFormulaClearNextUpdate] = useState(false);

  const [number, setNumber] = useState('0');
  const [decimal, setDecimal] = useState(false);
  const [numberPressed, setNumberPressed] = useState(false);

  const [keyPressed, setKeyPressed] = useState('');

  // Handler for number button press
  const handleNumberPress = (val) => {
    console.log('Number clicked: ', val);
    const maxLength = 16;
    if (number === '0') {
      setNumber(val);
    } else if (number.length < maxLength) {
      setNumber(number + val);
    }
    setNumberPressed(true);
  };

  // Handler for decimal point button press
  const handleDecimalPress = () => {
    if (!decimal) {
      setDecimal(true);
      setNumber(number + '.');
    }
  };

  // Handler for positive / negative button press
  const handleNegativePress = () => {
    if (number[0] === '-') {
      setNumber(number.slice(1));
    } else if (number !== '0') {
      setNumber('-' + number);
    }
  };

  // Handler for parens button presses
  const handleParensPress = (val) => {
    if (val === '(') {
      updateFormula(' (');
      setNumOpenParens(numOpenParens + 1);
    } else if (numOpenParens > 0) {
      updateFormula(formatNumberForFormula() + ')');
      setNumOpenParens(numOpenParens - 1);
      handleClearEntryPress();
    }
  };

  // Handler for AC button press
  const handleAllClearPress = () => {
    // Reset all state to initial settings:
    setFormula('');
    setNumOpenParens(0);

    handleClearEntryPress();
  };

  // Handler for CE button press
  const handleClearEntryPress = () => {
    setNumber('0');
    setDecimal(false);
    setNumberPressed(false);
  };

  // Handler for Delete button press
  const handleDeletePress = () => {
    const removed = formula[formula.length - 1];
    if (removed === '(') {
      setNumOpenParens(numOpenParens - 1);
    } else if (removed === ')') {
      setNumOpenParens(numOpenParens + 1);
    }

    updateFormula('', true);
  };

  // Handler when Operation buttons are pressed
  const handleOperationPress = (opString) => {
    // If formula ends with closing parenthesis, then add the operation to formula
    if (formula.endsWith(')')) {
      updateFormula(' ' + opString);
    } else if (!numberPressed) {
      // If we haven't entered a number yet
      if (opString === '-' && !formula.endsWith('-')) {
        // Handle using subtract symbol to make number entry negative:
        updateFormula(' ' + opString);
      } else if (
        opString !== '-' &&
        ['÷', '×', '+', '^'].includes(formula[formula.length - 3])
      ) {
        // Dealing with / * + operations when formula ends with e.g. +- / *- / /-
        updateFormula(opString, true, 3);
      } else if (
        opString !== '-' &&
        ['÷', '×', '+', '^'].includes(formula[formula.length - 1])
      ) {
        // Replacing the previous operator if a new operator is pressed
        updateFormula(opString, true);
      }
    } else {
      // We have entered a number into the calculator,
      // Add current number and opString to formula, clear number input
      updateFormula(formatNumberForFormula() + ' ' + opString);
      handleClearEntryPress();
    }
  };

  const handleLogPress = () => {
    updateFormula(` ln(${number})`);
    handleClearEntryPress();
  };

  // Handler to evaluate result of current formula when equals button is pressed
  const handleEqualPress = () => {
    // If we have entered a number then add it to the formula:
    let finalFormulaChars = '';
    if (numberPressed && !formula.endsWith(')')) {
      finalFormulaChars += formatNumberForFormula();
    }

    // Balance out any remaining closing parens in formula:
    if (numOpenParens) {
      finalFormulaChars += ')'.repeat(numOpenParens);
    }

    // Evaluate the result of the final formula after replacing JS operators:
    const toEvaluate = (formula + finalFormulaChars).replace(
      /×|÷|\^|ln/g,
      (match) => {
        if (match === '×') return '*';
        if (match === '÷') return '/';
        if (match === '^') return '**';
        if (match === 'ln') return 'Math.log';
      }
    );
    console.log('Trying to evaluate: ', toEvaluate);
    if (toEvaluate) {
      try {
        const result = eval(toEvaluate);
        console.log('Raw result is: ', result);
        updateFormula(finalFormulaChars + ' =');
        setNumber(result.toString());
        setNumberPressed(true);
        setFormulaClearNextUpdate(true);
      } catch (err) {
        setNumber('Syntax Error');
      }
    }
  };

  // Helper function to format current entered number for adding to formula:
  const formatNumberForFormula = () => {
    const extraSpace = formula.endsWith('(') ? '' : ' ';
    const formulaNumber = number[0] === '-' ? '(' + number + ')' : number;

    return extraSpace + formulaNumber;
  };

  // Helper function to control updates to formula state
  const updateFormula = (charsToAdd, replace = false, numToReplace = 1) => {
    console.log('Trying to update formula: ', formula, charsToAdd);
    let newFormula = formula;
    if (formulaClearNextUpdate) {
      newFormula = '';
      setFormulaClearNextUpdate(false);
    }

    if (replace) {
      newFormula =
        newFormula.slice(0, newFormula.length - numToReplace) + charsToAdd;
    } else {
      newFormula += charsToAdd;
    }

    setFormula(newFormula);
  };

  useEffect(() => {
    const keyDownEventListener = ({ key }) => {
      setKeyPressed(key);
    };

    const keyUpEventListener = () => {
      setKeyPressed('');
    };

    document.addEventListener('keydown', keyDownEventListener);
    document.addEventListener('keyup', keyUpEventListener);

    // Return function to remove eventListener on cleanup:
    return () => {
      document.removeEventListener('keydown', keyDownEventListener);
      document.removeEventListener('keyup', keyUpEventListener);
    };
  }, []);

  // UseEffect for when pressed keyboard key changes
  useEffect(() => {
    if (
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(keyPressed)
    ) {
      handleNumberPress(keyPressed);
    } else if (['+', '-', '*', '/', '^'].includes(keyPressed)) {
      handleOperationPress(keyPressed);
    } else if (keyPressed === '.') {
      handleDecimalPress();
    } else if (['(', ')'].includes(keyPressed)) {
      handleParensPress(keyPressed);
    } else if (['=', 'Enter'].includes(keyPressed)) {
      handleEqualPress();
    } else if (['Delete', 'Backspace'].includes(keyPressed)) {
      handleDeletePress();
    } else if (keyPressed === 'Escape') {
      handleAllClearPress();
    }
  }, [keyPressed]);

  return (
    <>
      <div className="calculator-body">
        {/* Calculator Display */}
        <div className="display-panel">
          <div className="formula-display">{formula}</div>
          <div className="number-display" id="display">
            {number}
          </div>
        </div>

        {/* Calculator Buttons */}
        <ButtonsDisplay
          keyPressed={keyPressed}
          handlers={{
            handleNumberPress,
            handleDecimalPress,
            handleNegativePress,
            handleParensPress,
            handleAllClearPress,
            handleClearEntryPress,
            handleDeletePress,
            handleOperationPress,
            handleLogPress,
            handleEqualPress,
          }}
        />
      </div>
    </>
  );
}

export default Calculator;
