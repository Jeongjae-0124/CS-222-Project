import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../ProductDetail.css'; 
const ProductDetailPage = () => {
  const location = useLocation();
  
  // Destructuring with default values for product properties
  const { 
    image = 'defaultImageURL', // Replace 'defaultImageURL' with an actual URL or path to a default image
    name = 'Default Product Name',
    price = 'Contact for price',
    contact = 'No contact info',
  } = location.state?.offer || {}; // Using optional chaining and fallback to empty object

  // State for managing comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Handler for comment input changes
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handler for submitting a new comment
  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment(''); // Reset input field after submission
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {/* Displaying the product image with a default fallback */}
          <img src={image} alt={name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{name}</h2>
          <p>Price: {price}</p>
          <p>Contact Seller: {contact}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <h3>Comments</h3>
          {/* List of comments */}
          <ul className="list-group">
            {comments.map((comment, index) => (
              <li key={index} className="list-group-item">{comment}</li>
            ))}
          </ul>
          <div className="mt-4">
            <textarea
              className="form-control"
              rows="3"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Leave a comment..."
            ></textarea>
            <button className="btn btn-primary mt-2" onClick={handleSubmitComment}>
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
