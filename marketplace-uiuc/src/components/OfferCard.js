// src/components/OfferCard.js
import React, { useState } from 'react';
import './OfferCard.css'; // Import additional CSS for OfferCard styling

const OfferCard = ({ offer }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">{offer.title}</h5>
          <p className="card-text">
            {offer.description.length > 50 ? (
              <>
                {offer.description.slice(0, 50)}...
                <br />
                <small className="text-muted">Hover for details</small>
              </>
            ) : (
              offer.description
            )}
          </p>
          <p className="card-text">
            <strong>Price:</strong> {offer.price}
          </p>
          <p className="card-text">
            <strong>Contact:</strong> {offer.contact}
          </p>
          <button className="btn btn-primary" onClick={handleModalToggle}>
            View Details
          </button>
        </div>
      </div>

      {/* Offer Details Modal */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }} onClick={handleModalToggle}>
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{offer.title}</h5>
                <button type="button" className="close" onClick={handleModalToggle}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="lead">{offer.description}</p>
                <p>
                  <strong>Price:</strong> {offer.price}
                </p>
                <p>
                  <strong>Contact:</strong> {offer.contact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferCard;
