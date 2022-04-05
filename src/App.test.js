import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App renders desired basic elements on screen', () => {
  test('renders Calculator App components correctly', () => {
    const { container: app } = render(<App />);
    // console.log('App is: ', app);
    const calculatorBody = app.querySelector('.calculator-body');
    expect(calculatorBody).toBeInTheDocument();
    const historyDisplay = app.querySelector('.history-display');
    expect(historyDisplay).toBeInTheDocument();
  });

  test('renders Calculator Buttons correctly', () => {
    render(<App />);
    const oneButton = screen.getByText('1');
    expect(oneButton).toBeInTheDocument();
    const twoButton = screen.getByText('2');
    expect(twoButton).toBeInTheDocument();
    const threeButton = screen.getByText('3');
    expect(threeButton).toBeInTheDocument();
    const fourButton = screen.getByText('4');
    expect(fourButton).toBeInTheDocument();
    const fiveButton = screen.getByText('5');
    expect(fiveButton).toBeInTheDocument();
    const sixButton = screen.getByText('6');
    expect(sixButton).toBeInTheDocument();
    const sevenButton = screen.getByText('7');
    expect(sevenButton).toBeInTheDocument();
    const eightButton = screen.getByText('8');
    expect(eightButton).toBeInTheDocument();
    const nineButton = screen.getByText('9');
    expect(nineButton).toBeInTheDocument();
    const [numberDisplay, zeroButton] = screen.getAllByText('0');
    expect(zeroButton).toBeInTheDocument();
  });

  test('renders Operation Buttons correctly', () => {
    render(<App />);
    const leftParens = screen.getByText('(');
    expect(leftParens).toBeInTheDocument();
    const rightParens = screen.getByText(')');
    expect(rightParens).toBeInTheDocument();
    const delButton = screen.getByText('DEL');
    expect(delButton).toBeInTheDocument();
    const clearEntry = screen.getByText('CE');
    expect(clearEntry).toBeInTheDocument();
    const allClear = screen.getByText('AC');
    expect(allClear).toBeInTheDocument();
    const powerButton = screen.getByText('^');
    expect(powerButton).toBeInTheDocument();
    const logButton = screen.getByText('ln');
    expect(logButton).toBeInTheDocument();
    const multiplyButton = screen.getByText('×');
    expect(multiplyButton).toBeInTheDocument();
    const divideButton = screen.getByText('÷');
    expect(divideButton).toBeInTheDocument();
    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();
    const subtractButton = screen.getByText('-');
    expect(subtractButton).toBeInTheDocument();
    const negateButton = screen.getByText('+/-');
    expect(negateButton).toBeInTheDocument();
    const decimalButton = screen.getByText('.');
    expect(decimalButton).toBeInTheDocument();
    const equalsButton = screen.getByText('=');
    expect(equalsButton).toBeInTheDocument();
  });
});

// Helpers to grab all calculator buttons for testing:
const buttonsArray = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  '(',
  ')',
  'DEL',
  'CE',
  'AC',
  '^',
  'ln',
  '×',
  '÷',
  '+',
  '-',
  '+/-',
  '.',
  '=',
];

const buttonsReducer = (accum, buttonStr) => {
  if (buttonStr !== 0) {
    accum[buttonStr] = screen.getByText(buttonStr);
  } else {
    accum[buttonStr] = screen.getAllByText(buttonStr)[1];
  }
  return accum;
};

describe('has basic calculator functionality', () => {
  test('basic number entry function works correctly', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    // Type 159 into the calculator, it should show on the number display
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[5]);
    fireEvent.click(buttons[9]);
    expect(numberDisplay).toHaveTextContent('159');
  });

  test('clear entry button clears number display', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');

    // Type 159 into the calculator, it should show on the number display
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[5]);
    fireEvent.click(buttons[9]);
    expect(numberDisplay).toHaveTextContent('159');

    fireEvent.click(buttons['CE']);

    expect(numberDisplay).toHaveTextContent('0');
  });

  test('Adds two numbers correctly and displays the result', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type 9 + 3 = into the calculator, result should be 12
    fireEvent.click(buttons[9]);
    fireEvent.click(buttons['+']);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['=']);

    // Number Display should read 12
    expect(numberDisplay).toHaveTextContent('12');

    // Formula Display should read '9 + 3 ='
    expect(formulaDisplay).toHaveTextContent('9 + 3 =');
  });

  test('Subtracts two numbers correctly and displays the result', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type 9 - 3 = into the calculator, result should be 6
    fireEvent.click(buttons[9]);
    fireEvent.click(buttons['-']);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['=']);

    // Number Display should read 6
    expect(numberDisplay).toHaveTextContent('6');

    // Formula Display should read '9 - 3 ='
    expect(formulaDisplay).toHaveTextContent('9 - 3 =');
  });

  test('Multiplies two numbers correctly and displays the result', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type 9 * 3 = into the calculator, result should be 12
    fireEvent.click(buttons[9]);
    fireEvent.click(buttons['×']);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['=']);

    // Number Display should read 27
    expect(numberDisplay).toHaveTextContent('27');

    // Formula Display should read '9 × 3 ='
    expect(formulaDisplay).toHaveTextContent('9 × 3 =');
  });

  test('Divides two numbers correctly and displays the result', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type 9 ÷ 3 = into the calculator, result should be 3
    fireEvent.click(buttons[9]);
    fireEvent.click(buttons['÷']);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['=']);

    // Number Display should read 3
    expect(numberDisplay).toHaveTextContent('3');

    // Formula Display should read '9 ÷ 3 ='
    expect(formulaDisplay).toHaveTextContent('9 ÷ 3 =');
  });

  test('Calculates simple powers correctly and displays the result', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type 9 ^ 3 = into the calculator, result should be 729
    fireEvent.click(buttons[9]);
    fireEvent.click(buttons['^']);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['=']);

    // Number Display should read 3
    expect(numberDisplay).toHaveTextContent('729');

    // Formula Display should read '9 ÷ 3 ='
    expect(formulaDisplay).toHaveTextContent('9 ^ 3 =');
  });

  test('Calculates logarithms correctly and displays the result', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type ln(9) = into the calculator, result should be 729
    fireEvent.click(buttons[9]);
    fireEvent.click(buttons['ln']);
    fireEvent.click(buttons['=']);

    // Number Display should read 3
    expect(numberDisplay).toHaveTextContent('2.1972245773362196');

    // Formula Display should read '9 ÷ 3 ='
    expect(formulaDisplay).toHaveTextContent('ln(9) =');
  });

  test('all clear button clears number and formula', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type 9 + 3 = into the calculator, result should be 12
    fireEvent.click(buttons[9]);
    fireEvent.click(buttons['+']);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['=']);

    // Number Display should read 12
    expect(numberDisplay).toHaveTextContent('12');

    // Formula Display should read '9 + 3 ='
    expect(formulaDisplay).toHaveTextContent('9 + 3 =');

    fireEvent.click(buttons['AC']);
    expect(numberDisplay).toHaveTextContent('0');
    expect(formulaDisplay).toHaveTextContent('');
  });

  test('calculates more complicated input correctly', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type 3 + 5 x 6 - 2 / 4 = into calculator, result is 32.5
    // (Formula / Expression Logic)
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['+']);
    fireEvent.click(buttons[5]);
    fireEvent.click(buttons['×']);
    fireEvent.click(buttons['6']);
    fireEvent.click(buttons['-']);
    fireEvent.click(buttons['2']);
    fireEvent.click(buttons['÷']);
    fireEvent.click(buttons['4']);
    fireEvent.click(buttons['=']);

    // Number Display should read 32.5
    expect(numberDisplay).toHaveTextContent('32.5');

    // Formula Display should read '9 + 3 ='
    expect(formulaDisplay).toHaveTextContent('3 + 5 × 6 - 2 ÷ 4 =');
  });

  test('all clear button clears number and formula', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type 9 + 3 = into the calculator, result should be 12
    fireEvent.click(buttons[9]);
    fireEvent.click(buttons['+']);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['=']);

    // Number Display should read 12
    expect(numberDisplay).toHaveTextContent('12');

    // Formula Display should read '9 + 3 ='
    expect(formulaDisplay).toHaveTextContent('9 + 3 =');

    fireEvent.click(buttons['AC']);
    expect(numberDisplay).toHaveTextContent('0');
    expect(formulaDisplay).toHaveTextContent('');
  });

  test('parenthesis are interpreted correctly in formulae', () => {
    render(<App />);
    const buttons = buttonsArray.reduce(buttonsReducer, {});
    const numberDisplay = screen.getByTestId('number-display');
    const formulaDisplay = screen.getByTestId('formula-display');

    // Type (3 + 5) x 6 - 2 / 4 = into calculator, result is 47.5
    // (Formula / Expression Logic)
    fireEvent.click(buttons['(']);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons['+']);
    fireEvent.click(buttons[5]);
    fireEvent.click(buttons[')']);
    fireEvent.click(buttons['×']);
    fireEvent.click(buttons['6']);
    fireEvent.click(buttons['-']);
    fireEvent.click(buttons['2']);
    fireEvent.click(buttons['÷']);
    fireEvent.click(buttons['4']);
    fireEvent.click(buttons['=']);

    // Number Display should read 32.5
    expect(numberDisplay).toHaveTextContent('47.5');

    // Formula Display should read '9 + 3 ='
    expect(formulaDisplay).toHaveTextContent('(3 + 5) × 6 - 2 ÷ 4 =');
  });
});
