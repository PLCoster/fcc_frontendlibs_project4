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

  useEffect(() => {
    console.log('Number updated to: ', number);
  }, [number]);

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
      updateFormula('(');
      setNumOpenParens(numOpenParens + 1);
    } else if (numOpenParens > 0) {
      updateFormula(number + ')');
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
      updateFormula(opString);
    } else if (!numberPressed) {
      // Handle using subtract symbol to make number entry negative:
      if (opString === '-' && !formula.endsWith('-')) {
        updateFormula(opString);
      } else if (
        opString !== '-' &&
        ['÷', '×', '+'].includes(formula[formula.length - 2])
      ) {
        // Dealing with / * + operations when formula ends with e.g. +- / *- / /-
        updateFormula(opString, true, 2);
      } else if (opString !== '-') {
        // Replacing the previous operator if a new operator is pressed
        updateFormula(opString, true);
      }
    } else {
      // We have entered a number into the calculator,
      // Add current number and opString to formula, clear number input
      const formulaNumber = number[0] === '-' ? '(' + number + ')' : number;
      updateFormula(formulaNumber + opString);
      handleClearEntryPress();
    }
  };

  // Handler to evaluate result of current formula when equals button is pressed
  const handleEqualPress = () => {
    // If we have entered a number then add it to the formula:
    let finalFormulaChars = '';
    if (numberPressed && !formula.endsWith(')')) {
      finalFormulaChars += number;
    }

    // Balance out any remaining closing parens in formula:
    if (numOpenParens) {
      finalFormulaChars += ')'.repeat(numOpenParens);
    }

    // Evaluate the result of the final formula after replacing JS operators:
    const toEvaluate = (formula + finalFormulaChars).replace(
      /×|÷/g,
      (match) => {
        if (match === '×') return '*';
        if (match === '÷') return '/';
        if (match === '^') return '**';
      }
    );
    console.log('Trying to evaluate: ', toEvaluate);
    if (toEvaluate) {
      const result = eval(toEvaluate).toString().slice(0, 16);
      setNumber(result);
      updateFormula(finalFormulaChars + '=');
      setNumberPressed(true);
      setFormulaClearNextUpdate(true);
    }
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
          handlers={{
            handleNumberPress,
            handleDecimalPress,
            handleNegativePress,
            handleParensPress,
            handleAllClearPress,
            handleClearEntryPress,
            handleDeletePress,
            handleOperationPress,
            handleEqualPress,
          }}
        />
      </div>
    </>
  );
}

export default Calculator;
