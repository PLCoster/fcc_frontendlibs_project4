import './HistoryDisplay.css';

function HistoryDisplay({ history }) {
  console.log('HistoryDisplay');
  const historyList = history.map(({ formula, result, key }) => {
    return (
      <div className="history-item" key={key}>
        <div>{formula + ' ='}</div>
        <div className="history-result">{result}</div>
      </div>
    );
  });
  return (
    <div className="history-container">
      <h5>History:</h5>
      {historyList}
    </div>
  );
}

export default HistoryDisplay;
