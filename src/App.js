import './App.css';

import NavBar from './components/NavBar';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container calculator-container">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
