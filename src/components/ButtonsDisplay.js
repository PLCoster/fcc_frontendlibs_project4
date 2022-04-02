import './ButtonsDisplay.css';

const buttonInfo = [
  {
    val: '(',
    id: 'left-parens',
    handler: 'handleParensPress',
    className: 'operator',
  },
  {
    val: ')',
    id: 'right-parens',
    handler: 'handleParensPress',
    className: 'operator',
  },
  {
    val: 'DEL',
    id: 'delete',
    handler: 'handleDeletePress',
    className: 'warning',
    key: 'Delete',
  },
  {
    val: 'CE',
    id: 'clear-entry',
    handler: 'handleClearEntryPress',
    className: 'warning',
  },
  {
    val: 'AC',
    id: 'clear',
    handler: 'handleAllClearPress',
    key: 'Escape',
    className: 'warning',
  },
  { val: '7', id: 'seven', handler: 'handleNumberPress', className: 'number' },
  { val: '8', id: 'eight', handler: 'handleNumberPress', className: 'number' },
  { val: '9', id: 'nine', handler: 'handleNumberPress', className: 'number' },
  {
    val: '^',
    id: 'power',
    handler: 'handleOperationPress',
    className: 'operator',
  },
  { val: 'ln', id: 'log', handler: 'handleLogPress', className: 'operator' },
  { val: '4', id: 'four', handler: 'handleNumberPress', className: 'number' },
  { val: '5', id: 'five', handler: 'handleNumberPress', className: 'number' },
  { val: '6', id: 'six', handler: 'handleNumberPress', className: 'number' },
  {
    val: '×',
    id: 'multiply',
    handler: 'handleOperationPress',
    className: 'operator',
    key: '*',
  },
  {
    val: '÷',
    id: 'divide',
    handler: 'handleOperationPress',
    className: 'operator',
    key: '/',
  },
  { val: '1', id: 'one', handler: 'handleNumberPress', className: 'number' },
  { val: '2', id: 'two', handler: 'handleNumberPress', className: 'number' },
  { val: '3', id: 'three', handler: 'handleNumberPress', className: 'number' },
  {
    val: '+',
    id: 'add',
    handler: 'handleOperationPress',
    className: 'operator',
  },
  {
    val: '-',
    id: 'subtract',
    handler: 'handleOperationPress',
    className: 'operator',
  },
  {
    val: '+/-',
    id: 'negative',
    handler: 'handleNegativePress',
    className: 'number',
  },
  { val: '0', id: 'zero', handler: 'handleNumberPress', className: 'number' },
  {
    val: '.',
    id: 'decimal',
    handler: 'handleDecimalPress',
    className: 'number',
  },
  { val: '=', id: 'equals', handler: 'handleEqualPress', className: 'equals' },
];

function ButtonsDisplay({ keyPressed, handlers, syntaxError }) {
  const buttons = buttonInfo.map(({ val, id, handler, className, key }) => {
    const activeClass = (key || val) === keyPressed ? ' active' : '';
    return (
      <button
        id={id}
        key={id}
        className={className + activeClass}
        onClick={() => {
          console.log(id, 'clicked', syntaxError);
          syntaxError ? handlers.handleAllClearPress() : handlers[handler](val);
        }}
      >
        <h5>{val}</h5>
      </button>
    );
  });
  return <div className="buttons-display">{buttons}</div>;
}

export default ButtonsDisplay;
