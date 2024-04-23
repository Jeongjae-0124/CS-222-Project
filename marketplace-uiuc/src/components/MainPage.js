// src/components/MainPage.js
import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import Slider from 'react-slick'; 
import OfferCard from './OfferCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainPage.css'; // Import additional CSS for MainPage styling
import './OfferCard.css';
const MainPage = () => {
  const[offers, setOffers]= useState([]);


  useEffect( ()=>{
    const getProduct= ()=>{
        fetch("http://localhost/react/api/index.php")
        .then(res=>{ return res.json()})
        .then(data=>{ setOffers(data)})
        .catch(error=>{ console.log(error)});
    }
    getProduct();
  },[]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueFilteredOffers = [...new Set(filteredOffers)]; // Remove duplicates

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust the breakpoint as needed
        settings: {
          slidesToShow: 2,
          speed: 500,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleDetailsClick = (offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
  };

  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light text-dark rounded shadow">
        <h1 className="display-4 text-center mb-4">Welcome to Marketplace @ Urbana-Champaign</h1>
        <p className="lead text-center">
          Explore and discover a variety of items and services offered within the university community.
        </p>
        <div className="input-group mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for offers..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-center mb-4">Featured Offers</h2>

      {uniqueFilteredOffers.length > 0 ? (
        <Slider {...settings}>
          {uniqueFilteredOffers.map((offer) => (
            <div key={offer.id} className="carousel-item">
              <OfferCard offer={offer} onDetailsClick={handleDetailsClick} showDetailsButton={false} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">No matching offers found.</p>
      )}

      {selectedOffer && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }} onClick={handleCloseModal}>
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedOffer.title}</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="lead">{selectedOffer.description}</p>
                <p>
                  <strong>Price:</strong> {selectedOffer.price}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedOffer.contact}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;