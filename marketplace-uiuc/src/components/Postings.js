import React, { useState,useEffect} from 'react';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import NewOfferForm from './NewOfferForm';
import OfferCard from './OfferCard';



const Postings = () => {
  const [postings, setPostings] = useState([
  ]);

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

  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light text-dark text-center">
        <h1 className="display-4 mb-4">Offer Postings</h1>
        <p className="lead">Explore items and services for sale within the marketplace.</p>
      </div>

      {isLoggedIn && <NewOfferForm onSubmit={handleNewPostingSubmit} />}

      <div className="row mt-4">
        {postings.map((posting) => (
          <div key={posting.id} className="col-lg-4 col-md-6 mb-4">

            <OfferCard offer={posting} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postings;