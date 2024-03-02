// src/components/OfferDetailsPopup.js
import React from 'react';

const OfferDetailsPopup = ({ offer, onClose }) => {
  return (
    <div className="offer-details-popup">
      <div className="offer-details-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{offer.title}</h2>
        <p>{offer.description}</p>
        <p><strong>Price:</strong> {offer.price}</p>
        <p><strong>Contact:</strong> {offer.contact}</p>
      </div>
    </div>
  );
};

export default OfferDetailsPopup;
