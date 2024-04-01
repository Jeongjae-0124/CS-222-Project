import React, { useState, useEffect } from 'react';

// Dummy function to simulate fetching product details from an API
const fetchProductDetails = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: 'Sample Product',
        description: 'This is a sample description of the product.',
        price: '$19.99',
        imageUrl: 'https://via.placeholder.com/150',
      });
    }, 1000);
  });
};

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(productId).then(setProduct);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.price}</p>
      {/* Add more product details here */}
    </div>
  );
};

export default ProductDetail;
