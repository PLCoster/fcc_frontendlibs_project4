import { useState } from 'react';

import './Calculator.css';

import ButtonsDisplay from './ButtonsDisplay';

function Calculator() {
  const [formula, setFormula] = useState('');
  const [numOpenParens, setNumOpenParens] = useState(0);

  const [number, setNumber] = useState('0');
  const [decimal, setDecimal] = useState(false);

  // Helper function to update number when a number button is pressed
  const handleNumberPress = (val) => {
    const maxLength = 16;
    if (number === '0') {
      setNumber(val);
    } else if (number.length < maxLength) {
      setNumber(number + val);
    }
  };

  // Helper function to convert number to decimal when point is pressed
  const handleDecimalPress = () => {
    if (!decimal) {
      setDecimal(true);
      setNumber(number + '.');
    }
  };

  // Helper function to convert input number between positive / negative
  const handleNegativePress = () => {
    if (number[0] === '-') {
      setNumber(number.slice(1));
    } else {
      setNumber('-' + number);
    }
  };

  // Helper function to handle parens button presses
  const handleParensPress = (val) => {
    if (val === '(') {
      setFormula(formula + '(');
      setNumOpenParens(numOpenParens + 1);
    } else if (numOpenParens > 0) {
      setFormula(formula + ')');
      setNumOpenParens(numOpenParens - 1);
    }
  };

  // Helper function to handle AC button press
  const handleAllClearPress = () => {
    // Reset all state to initial settings:
    setFormula('');
    setNumOpenParens(0);

    setNumber('0');
    setDecimal(false);
  };

  // Helper function to handle Delete button press
  const handleDeletePress = () => {
    const removed = formula[formula.length - 1];
    if (removed === '(') {
      setNumOpenParens(numOpenParens - 1);
    } else if (removed === ')') {
      setNumOpenParens(numOpenParens + 1);
    }

    setFormula(formula.slice(0, formula.length - 1));
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
            handleDeletePress,
          }}
        />
      </div>
    </>
  );
}

export default Calculator;
