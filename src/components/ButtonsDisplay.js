import './ButtonsDisplay.css';

const buttonInfo = [
  { val: '(', id: 'left-parens', handler: 'handleParensPress' },
  { val: ')', id: 'right-parens', handler: 'handleParensPress' },
  { val: 'DEL', id: 'delete', handler: 'handleDeletePress' },
  { val: 'AC', id: 'clear', handler: 'handleAllClearPress' },
  { val: '7', id: 'seven', handler: 'handleNumberPress' },
  { val: '8', id: 'eight', handler: 'handleNumberPress' },
  { val: '9', id: 'nine', handler: 'handleNumberPress' },
  { val: '÷', id: 'divide' },
  { val: '4', id: 'four', handler: 'handleNumberPress' },
  { val: '5', id: 'five', handler: 'handleNumberPress' },
  { val: '6', id: 'six', handler: 'handleNumberPress' },
  { val: '×', id: 'multiply' },
  { val: '1', id: 'one', handler: 'handleNumberPress' },
  { val: '2', id: 'two', handler: 'handleNumberPress' },
  { val: '3', id: 'three', handler: 'handleNumberPress' },
  { val: '-', id: 'subtract' },
  { val: '+/-', id: 'negative', handler: 'handleNegativePress' },
  { val: '0', id: 'zero', handler: 'handleNumberPress' },
  { val: '.', id: 'decimal', handler: 'handleDecimalPress' },
  { val: '+', id: 'add' },
  { val: '=', id: 'equals' },
];

function ButtonsDisplay({ handlers }) {
  console.log('Buttons Display: ', handlers);

  const buttons = buttonInfo.map(({ val, id, handler }) => {
    return (
      <button
        id={id}
        key={id}
        onClick={() => {
          handlers[handler](val);
        }}
      >
        {val}
      </button>
    );
  });
  return <div className="buttons-display">{buttons}</div>;
}

export default ButtonsDisplay;
