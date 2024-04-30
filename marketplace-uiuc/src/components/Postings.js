import React, { useState,useEffect,useRef} from 'react';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import NewOfferForm from './NewOfferForm';
import OfferCard from './OfferCard';



const Postings = () => {
  const [postings, setPostings] = useState([
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of products every page
  const containerRef = useRef(null);

  useEffect( ()=>{
    const getProduct= ()=>{
        fetch("http://localhost/react/api/index.php")
        .then(res=>{ return res.json()})
        .then(data=>{ setPostings(data)})
        .catch(error=>{ console.log(error)});
    }
    getProduct();
  },[]);

  const { accounts } = useMsal();
  const isLoggedIn = accounts.length > 0;

  const handleNewPostingSubmit = (newPosting) => {
    const currentUser = accounts[0];

    const updatedPostings = [
      ...postings,
      {
        id: postings.length + 1,
        ...newPosting,
        contact: isLoggedIn ? currentUser.username : 'Anonymous',
      },
    ];

    setPostings(updatedPostings);
  };

  const totalPages = Math.ceil(postings.length / itemsPerPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = postings.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light text-dark text-center">
        <h1 className="display-4 mb-4">Offer Postings</h1>
        <p className="lead">Explore items and services for sale within the marketplace.</p>
      </div>

      {isLoggedIn && <NewOfferForm onSubmit={handleNewPostingSubmit} />}

      <div className="container mt-4">
      <h2>Available Products</h2>
      <div className="row">
        {currentProducts.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <OfferCard offer={product} />
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, pageNumber) => (
            <li key={pageNumber} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default Postings;