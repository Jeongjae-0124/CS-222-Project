// src/components/NewOfferForm.js
import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';

const NewOfferForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { accounts } = useMsal();

  useEffect(() => {
    // Set user's email if logged in
    if (accounts.length > 0) {
      setUserEmail(accounts[0].username);
    }
  }, [accounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, price, contact: userEmail });
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Submit a New Offer</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Offer
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewOfferForm;
