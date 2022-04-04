import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './HistoryDisplay.css';

function HistoryDisplay({ history, handleHistoryClick, handleHistoryClear }) {
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
      <div className="history-header">
        <h5>History:</h5>
        <FontAwesomeIcon icon={faTrashCan} onClick={handleHistoryClear} />
      </div>

      <div className="history-item-container">{historyList}</div>
    </div>
  );
}

export default HistoryDisplay;
