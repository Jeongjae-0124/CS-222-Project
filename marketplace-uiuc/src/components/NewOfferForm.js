// src/components/NewOfferForm.js
import React, { useState } from 'react';

const NewOfferForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, price, contact }); // set based on what's being inputted below (in the input fields)
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setPrice('');
    setContact('');
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Submit a New Offer</h5> 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label> {/* This is like the title div for creating the form*/}
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              required
            /> {/*  apply the js function for whatever is inputted as title*/}
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
          </div> {/* same but for setting price, contact, info */}
          <div className="form-group">
            <label htmlFor="contact">Contact Information</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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
