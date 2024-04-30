import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../ProductDetail.css';

import { useMsal } from '@azure/msal-react';

const ProductDetailPage = () => {
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  const { accounts } = useMsal();
  const currentUser = accounts[0];

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost/react/api/comments.php?offer_id=${location.state?.offer.id}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
        } else {
          throw new Error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  }, [location.state?.offer.id]);
  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      if (newComment.trim() !== '') {
        const formData = new FormData();
        formData.append('offer_id', location.state?.offer.id);
        formData.append('user_id', currentUser.username);
        formData.append('text', newComment);
  
        const response = await axios.post('http://localhost/react/api/comments.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
          },
        });
  
        if (response.data.success) {
          const data = response.data;
          setComments([...comments, data.comment]);
          setNewComment('');
        } else {
          throw new Error('Failed to submit comment');
        }
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {/* Displaying the product image with a default fallback */}
          {location.state?.offer.image && (
            <img src={`http://localhost/react/images/${location.state.offer.image}`} alt={location.state.offer.title} className="card-img-top" height={300} width={50} />
          )}
        </div>
        <div className="col-md-6">
          <h2>{location.state?.offer.title}</h2>
          <p>Description: {location.state?.offer.description}</p>
          <p>Price: {location.state?.offer.price}</p>
          <p>Contact Seller: {location.state?.offer.contact}</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <h3>Comments</h3>
          <ul className="list-group">
            {comments.map((comment, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>
                    <span className="badge badge-primary mr-2">{"Username"}</span>
                  </strong>
                  <div>{comment.text}</div>
                </div>
                <small className="text-muted">
                  <span className="badge badge-secondary">
                    {new Date(comment.timestamp).toLocaleString(navigator.language, {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </small>
              </li>
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
