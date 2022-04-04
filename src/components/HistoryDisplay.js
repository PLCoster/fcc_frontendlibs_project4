import './HistoryDisplay.css';

function HistoryDisplay({ history, handleHistoryClick }) {
  console.log('HistoryDisplay');
  const historyList = history.map(({ formula, result, key }) => {
    return (
      <div
        className="history-item"
        key={key}
        onClick={() => handleHistoryClick(formula + ' =', result)}
      >
        <div>{formula + ' ='}</div>
        <div className="history-result">{result}</div>
      </div>
    );
  });
  return (
    <div className="history-display">
      <h5>History:</h5>
      <div className="history-item-container">{historyList}</div>
    </div>
  );
}

export default HistoryDisplay;
