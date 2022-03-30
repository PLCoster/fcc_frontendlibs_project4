import './Calculator.css';

import Buttons from './Buttons';

function Calculator() {
  return (
    <>
      <div className="calculator-body">
        {/* Calculator Display */}
        <div className="display-panel">
          <div className="formula-display">1 + 2 + 3 + 4</div>
          <div className="number-display" id="display">
            10
          </div>
        </div>

        {/* Calculator Buttons */}
        <Buttons />
      </div>
    </>
  );
}

export default Calculator;
