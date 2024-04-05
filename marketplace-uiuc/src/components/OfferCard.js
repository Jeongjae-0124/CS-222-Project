// Importing necessary hooks and functions from React and react-router
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

// Defining the OfferCard component, which receives 'offer' as a prop
const OfferCard = ({ offer }) => {
  // useState hook to manage the visibility state of the modal dialog
  const [showModal, setShowModal] = useState(false);
  // useNavigate hook for navigation. The commented-out line is an older approach using useHistory
  const navigate = useNavigate();

  // Function to toggle the modal's visibility
  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  // Function to navigate to the product detail page
  const handleViewDetails = () => {
    navigate('/productdetail');
  };

  // The component's rendered JSX
  return (
    // A card container div
    <div className="card">
      <div className="card-body">
        {/* Conditionally rendering the offer's image if it exists */}
        {offer.image && (
          <img src={offer.image} alt={offer.title} className="card-img-top" style={{ maxWidth: '100%', height: 'auto' }} />
        )}
        <h5 className="card-title">{offer.title}</h5>
        <p className="card-text">{offer.description}</p>
        <p className="card-text">Price: {offer.price}</p>
        <p className="card-text">Contact: {offer.contact}</p>
        <button className="btn btn-primary" onClick={handleViewDetails}>
          View Details
        </button>
        
        {/* Conditional rendering of the modal based on showModal state */}
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
                  {/* Optionally displaying the image in the modal as well */}
                  {offer.image && (
                    <img src={offer.image} alt={offer.title} style={{ maxWidth: '100%', marginBottom: '20px' }} />
                  )}
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

// Exporting OfferCard for use in other parts of the application
export default OfferCard;
