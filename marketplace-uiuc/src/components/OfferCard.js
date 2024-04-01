import React, { useState } from 'react';
import { useNavigate } from 'react-router';


const OfferCard = ({ offer }) => {
  const [showModal, setShowModal] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleViewDetails = () => {
    navigate('/productdetail');
  };


  return (
    <div className="card">
      <div className="card-body">
        {/* Conditionally render the image if it exists in the offer */}
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
                  {/* Also display the image in the modal if it exists */}
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

export default OfferCard;
