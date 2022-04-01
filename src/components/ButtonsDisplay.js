import './ButtonsDisplay.css';

const buttonInfo = [
  { val: '(', id: 'left-parens', handler: 'handleParensPress' },
  { val: ')', id: 'right-parens', handler: 'handleParensPress' },
  { val: 'DEL', id: 'delete', handler: 'handleDeletePress' },
  { val: 'CE', id: 'clear-entry', handler: 'handleClearEntryPress' },
  { val: 'AC', id: 'clear', handler: 'handleAllClearPress' },
  { val: '7', id: 'seven', handler: 'handleNumberPress' },
  { val: '8', id: 'eight', handler: 'handleNumberPress' },
  { val: '9', id: 'nine', handler: 'handleNumberPress' },
  { val: '^', id: 'power', handler: 'handleOperationPress' },
  { val: 'ln', id: 'log', handler: 'handleLogPress' },
  { val: '4', id: 'four', handler: 'handleNumberPress' },
  { val: '5', id: 'five', handler: 'handleNumberPress' },
  { val: '6', id: 'six', handler: 'handleNumberPress' },
  { val: '×', id: 'multiply', handler: 'handleOperationPress' },
  { val: '÷', id: 'divide', handler: 'handleOperationPress' },
  { val: '1', id: 'one', handler: 'handleNumberPress' },
  { val: '2', id: 'two', handler: 'handleNumberPress' },
  { val: '3', id: 'three', handler: 'handleNumberPress' },
  { val: '+', id: 'add', handler: 'handleOperationPress' },
  { val: '-', id: 'subtract', handler: 'handleOperationPress' },
  { val: '+/-', id: 'negative', handler: 'handleNegativePress' },
  { val: '0', id: 'zero', handler: 'handleNumberPress' },
  { val: '.', id: 'decimal', handler: 'handleDecimalPress' },
  { val: '=', id: 'equals', handler: 'handleEqualPress', className: 'equals' },
];

function ButtonsDisplay({ keyPressed, handlers, syntaxError }) {
  console.log('Button Display');
  const buttons = buttonInfo.map(({ val, id, handler, className }) => {
    return (
      <button
        id={id}
        key={id}
        className={className}
        onClick={() => {
          console.log(id, 'clicked', syntaxError);
          syntaxError ? handlers.handleAllClearPress() : handlers[handler](val);
        }}
      >
        {val}
      </button>
    );
  });
  return <div className="buttons-display">{buttons}</div>;
}

export default ButtonsDisplay;
