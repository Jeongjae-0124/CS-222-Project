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
// New script for Navbar blur effect
// New script for Navbar blur effect
document.addEventListener('DOMContentLoaded', function () {
  const navbarLinks = document.querySelectorAll('.navbar-custom .navbar-nav .nav-link, .navbar-custom .navbar-brand');

  navbarLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      // Add class to the parent when a link is hovered
      const navbarNav = this.closest('.navbar-nav');
      if (navbarNav) {
        navbarNav.classList.add('blur-on-hover');
      }
    });

    link.addEventListener('mouseleave', function () {
      // Remove class when the mouse leaves the link
      const navbarNav = this.closest('.navbar-nav');
      if (navbarNav) {
        navbarNav.classList.remove('blur-on-hover');
      }
    });
  });
});
