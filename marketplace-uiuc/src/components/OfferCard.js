import React, { useState } from 'react';

const OfferCard = ({ offer, showDetailsButton = true }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h5 className="card-title">{offer.title}</h5>
        <p className="card-text">{offer.description}</p>
        <p className="card-text">Price: {offer.price}</p>
        <p className="card-text">Contact: {offer.contact}</p>
        {showDetailsButton && (
          <button className="btn btn-primary" onClick={handleModalToggle}>
            View Details
          </button>
        )}

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
                  <p className="lead">{offer.description}</p>
                  <p>
                    <strong>Price:</strong> {offer.price}
                  </p>
                  <p>
                    <strong>Contact:</strong> {offer.contact}
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleModalToggle}>
                    Close
                  </button>
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
