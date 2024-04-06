import React, { useState } from 'react';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import NewOfferForm from './NewOfferForm';
import OfferCard from './OfferCard';

const Postings = () => {
  const [postings, setPostings] = useState([
    {
      id: 1,
      title: 'Textbook for Sale',
      description: 'Introduction to Computer Science',
      price: '$50',
      contact: 'john.doe@example.com',
    },
    {
      id: 2,
      title: 'Graphing Calculator',
      description: 'TI-84 Plus CE',
      price: '$80',
      contact: 'jane.smith@example.com',
    },
    {
      id: 3,
      title: 'Coding Laptop',
      description: 'MacBook Pro 13-inch',
      price: '$1200',
      contact: 'sam.jones@example.com',
    },
    {
      id: 4,
      title: 'Bike for Sale',
      description: 'Mountain Bike, Excellent Condition',
      price: '$200',
      contact: 'mike.roberts@example.com',
    },
    {
      id: 5,
      title: 'Microwave',
      description: 'Brand New Microwave, Still in Box',
      price: '$50',
      contact: 'sara.davis@example.com',
    },
    {
      id: 6,
      title: 'Roommate Wanted',
      description: 'Looking for a roommate for a 2-bedroom apartment',
      price: 'Free',
      contact: 'emily.johnson@example.com',
    },
    {
      id: 7,
      title: 'Guitar Lessons',
      description: 'Professional guitar lessons, all levels welcome',
      price: '$30/hour',
      contact: 'david.miller@example.com',
    },
    {
      id: 8,
      title: 'Furniture Set',
      description: 'Complete living room furniture set, great condition',
      price: '$500',
      contact: 'lisa.white@example.com',
    },
    {
      id: 9,
      title: 'Tutoring Services',
      description: 'Math and Physics tutoring, experienced tutor',
      price: '$25/hour',
      contact: 'alex.tutor@example.com',
    },
    // Add more offers as needed
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