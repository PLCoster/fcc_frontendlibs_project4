import React from 'react';
// import * as ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// Import Styles
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';

// Attach the react component tree to the HTML DOM (React 18)
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// FCC Testing Suite only performs properly using older render method
ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
