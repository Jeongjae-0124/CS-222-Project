// src/components/MainPage.js
import React, { useState } from 'react';
import OfferCard from './OfferCard';
import NewOfferForm from './NewOfferForm';

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

  const handleNewOfferSubmit = (newOffer) => {
    setOffers([...offers, { id: offers.length + 1, ...newOffer }]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Welcome to Marketplace @ Urbana-Champaign</h2>

      <NewOfferForm onSubmit={handleNewOfferSubmit} />

      <div className="row mt-4">
        {offers.map((offer) => (
          <div key={offer.id} className="col-md-4 mb-4">
            <OfferCard offer={offer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
