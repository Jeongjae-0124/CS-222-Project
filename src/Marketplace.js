// Marketplace.js

import React, { useState, useEffect } from 'react';
import './Marketplace.css'; // Import your CSS file

const Marketplace = () => {
  const [transitionInProgress, setTransitionInProgress] = useState(false);

//   useEffect(() => {
//     if (transitionInProgress) {
//       // Apply a fade-out transition effect for the main content after a delay
//       setTimeout(() => {
//         window.location.href = targetPage + '.html';
//       }, 500);
//     }
//   }, [transitionInProgress]);

  const exploreOffers = () => {
    // Add logic to navigate to the offers page or any exploration functionality
    applyPageTransition('offers');
  };

  const navigateToPage = (page) => {
    // Apply a transition effect by updating the state
    setTransitionInProgress(true);
  };

  const applyPageTransition = (targetPage) => {
    setTransitionInProgress(true);
    // Perform the navigation after a delay, ensuring targetPage is defined
    setTimeout(() => {
      window.location.href = `${targetPage}.html`;
      setTransitionInProgress(false); // Reset transition state after navigation
    }, 500);
  };

//   const registerUser = (event) => {
//     event.preventDefault();
//     // Add logic to handle user registration, send data to the server, etc.
//     alert('User registration functionality coming soon!');
//   };

  return (
    <div>
      <header>
        <h1>Welcome to the UIUC Marketplace</h1>
        <nav>
          <ul>
            <li><a onClick={() => navigateToPage('index')}>Home</a></li>
            <li><a onClick={() => navigateToPage('index')}>Offers</a></li> 
            <li><a onClick={() => applyPageTransition('index')}>Login</a></li>
          </ul>
        </nav>
      </header>

      <main data-transition={transitionInProgress ? 'in-progress' : 'idle'} id="main">
        {/* Hero Section */}
        <section id="hero">
          <h2>Discover and Sell Items Locally</h2>
          <p>Find great deals from your local community.</p>
          <button onClick={() => exploreOffers()}>Explore Offers</button>
        </section>

        {/* How It Works Section */}
        <section data-page="how-it-works" id="how-it-works">
          <h2>How It Works</h2>
          {/* Steps go here */}
        </section>

      </main>

      <footer>
        <p>&copy; 2024 UIUC Marketplace</p>
      </footer>

      {/* Include your app.js and hammer.js script here */}
      <script src="app.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
    </div>
  );
};

export default Marketplace;