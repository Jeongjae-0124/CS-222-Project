// Importing the React library
import React from 'react';

// Defining a functional component named OfferDetailsPopup
// This component expects props: 'offer' object containing offer details, and 'onClose' function to close the popup
const OfferDetailsPopup = ({ offer, onClose }) => {
  // The JSX returned by this component
  return (
    // A div element with a className of 'offer-details-popup' acts as the container for the popup
    <div className="offer-details-popup">
      // A div element containing the details of the offer with a className of 'offer-details-content'
      <div className="offer-details-content">
        // A span that acts as a close button. When clicked, it calls the onClose function passed as a prop
        <span className="close-button" onClick={onClose}>&times;</span>
        // Displaying the title of the offer in an h2 tag
        <h2>{offer.title}</h2>
        // Displaying the description of the offer in a paragraph tag
        <p>{offer.description}</p>
        // Displaying the price of the offer in a paragraph tag, prefixed with 'Price:'
        <p><strong>Price:</strong> {offer.price}</p>
        // Displaying the contact information of the offer in a paragraph tag, prefixed with 'Contact:'
        <p><strong>Contact:</strong> {offer.contact}</p>
      </div>
    </div>
  );
};

// Exporting the OfferDetailsPopup component so it can be used in other parts of the application
export default OfferDetailsPopup;
