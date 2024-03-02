// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Add this line
// import 'bootstrap/dist/css/bootstrap.min.css';
// src/index.js or src/index.jsx
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
