import React, { useState } from 'react';

const NewOfferForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState(null); // State to store the image

  // Function to handle converting the file to a base64-encoded string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, price, contact, image }); // Include the image in the submission
    setTitle('');
    setDescription('');
    setPrice('');
    setContact('');
    setImage(null); // Reset the image state
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Submit a New Offer</h5>
        <form onSubmit={handleSubmit}>
          {/* Existing form fields for title, description, price, and contact */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Information</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          {/* New input field for selecting an image */}
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleImageChange}
              accept="image/*" // Accept only image files
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit Offer</button>
        </form>
      </div>
    </div>
  );
};

export default NewOfferForm;
