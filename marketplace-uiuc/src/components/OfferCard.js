// src/components/OfferCard.js
import React, { useState } from 'react';

const OfferCard = ({ offer }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{offer.title}</h5>
        <p className="card-text">{offer.description}</p>
        <p className="card-text">Price: {offer.price}</p>
        <p className="card-text">Contact: {offer.contact}</p>
        <button className="btn btn-primary" onClick={handleModalToggle}>
          View Details
        </button>

        {/* Offer Details Modal */}
        {showModal && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{offer.title}</h5>
                  <button type="button" className="close" onClick={handleModalToggle}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{offer.description}</p>
                  <p>Price: {offer.price}</p>
                  <p>Contact: {offer.contact}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
