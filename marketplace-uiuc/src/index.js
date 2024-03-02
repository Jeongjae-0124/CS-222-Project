// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { PublicClientApplication } from '@azure/msal-browser'; // Correct import
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './msalConfig.js';
import App from './App';
import './index.css'; // Add this line
import 'bootstrap/dist/css/bootstrap.min.css';

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>,
  document.getElementById('root')
);
