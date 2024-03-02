import React, { useState } from 'react';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import NewOfferForm from './NewOfferForm';
import OfferCard from './OfferCard';

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

  const { accounts } = useMsal();
  const isLoggedIn = accounts.length > 0;

  const handleNewPostingSubmit = (newPosting) => {
    const currentUser = accounts[0];

    const updatedPostings = [
      ...postings,
      {
        id: postings.length + 1,
        ...newPosting,
        contact: isLoggedIn ? currentUser.username : 'Anonymous',
      },
    ];

    setPostings(updatedPostings);
  };

  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light text-dark text-center">
        <h1 className="display-4 mb-4">Offer Postings</h1>
        <p className="lead">Explore items and services for sale within the marketplace.</p>
      </div>

      {isLoggedIn && <NewOfferForm onSubmit={handleNewPostingSubmit} />}

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
