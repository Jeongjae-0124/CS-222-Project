// src/components/Postings.js
import React, { useState } from 'react';
import OfferCard from './OfferCard';
import NewOfferForm from './NewOfferForm';

const Postings = () => {
  const [postings, setPostings] = useState([
    {
      id: 1,
      title: 'Laptop for Sale',
      description: 'Used MacBook Pro, good condition.',
      price: '$800',
      contact: 'seller@example.com',
    },
    {
      id: 2,
      title: 'Bike for Sale',
      description: 'Mountain bike, excellent for off-road trails.',
      price: '$300',
      contact: 'biker@example.com',
    },
    // Add more postings as needed
  ]);

  const handleNewPostingSubmit = (newPosting) => {
    setPostings([...postings, { id: postings.length + 1, ...newPosting }]);
  };

  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light text-dark text-center">
        <h1 className="display-4 mb-4">Offer Postings</h1>
        <p className="lead">Explore items and services for sale within the marketplace.</p>
      </div>

      <NewOfferForm onSubmit={handleNewPostingSubmit} />

      <div className="row mt-4">
        {postings.map((posting) => (
          <div key={posting.id} className="col-lg-4 col-md-6 mb-4">
            <OfferCard offer={posting} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postings;
