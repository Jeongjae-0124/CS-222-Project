import React, { useState,useEffect} from 'react';

const ProductList = () => {
  const[product, setProduct]= useState([]);


  useEffect( ()=>{
    const getProduct= ()=>{
        fetch("http://localhost/react/api/index.php")
        .then(res=>{ return res.json()})
        .then(data=>{ setProduct(data)})
        .catch(error=>{ console.log(error)});
    }
    getProduct();
  },[]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-4">
      <h2>Available Products</h2>
      <div className="row">
        {product.map((pdata,index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{pdata.title}</h5>
                <p className="card-text-des">{pdata.description}</p> 
                <p className="card-text-price">{pdata.price}</p> 
                <p className="card-text-contact">{pdata.contact}</p>
            
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#productModal"
                  onClick={() => handleProductClick(product)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="productModalLabel">
                  {selectedProduct.name}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{selectedProduct.description}</p>
                <p>Price: {selectedProduct.price}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleModalClose}
                >
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

export default ProductList;
