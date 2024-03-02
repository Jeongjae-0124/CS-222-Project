// src/components/MainPage.js
import React, { useState } from 'react';
import OfferCard from './OfferCard';

const MainPage = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: 'Textbook for Sale',
      description: 'Introduction to Computer Science',
      price: '$50',
      contact: 'john.doe@example.com',
    },
    // Add more offers as needed
  ]);

  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light text-dark rounded shadow">
        <h1 className="display-4 text-center mb-4">Welcome to Marketplace @ Urbana-Champaign</h1>
        <p className="lead text-center">
          Explore and discover a variety of items and services offered within the university community.
        </p>
      </div>

      <h2 className="text-center mb-4">Featured Offers</h2>

      <div className="row justify-content-center">
        {offers.map((offer) => (
          <div key={offer.id} className="col-lg-4 col-md-6 mb-4">
            <OfferCard offer={offer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
