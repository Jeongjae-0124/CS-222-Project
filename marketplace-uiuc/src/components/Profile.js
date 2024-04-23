// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import { msalConfig } from '../msalConfig.js';
import NewOfferForm from './NewOfferForm';
import OfferCard from './OfferCard';

const Profile = () => {
  const [postings, setPostings] = useState([
    // {
    //   id: 1,
    //   title: 'Textbook for Sale',
    //   description: 'Introduction to Computer Science',
    //   price: '$50',
    //   contact: 'john.doe@example.com',
    // },
    // {
    //   id: 2,
    //   title: 'Graphing Calculator',
    //   description: 'TI-84 Plus CE',
    //   price: '$80',
    //   contact: 'jane.smith@example.com',
    // },
    // {
    //   id: 3,
    //   title: 'Coding Laptop',
    //   description: 'MacBook Pro 13-inch',
    //   price: '$1200',
    //   contact: 'sam.jones@example.com',
    // },
    // {
    //   id: 4,
    //   title: 'Bike for Sale',
    //   description: 'Mountain Bike, Excellent Condition',
    //   price: '$200',
    //   contact: 'mike.roberts@example.com',
    // },
    // {
    //   id: 5,
    //   title: 'Microwave',
    //   description: 'Brand New Microwave, Still in Box',
    //   price: '$50',
    //   contact: 'sara.davis@example.com',
    // },
    // {
    //   id: 6,
    //   title: 'Roommate Wanted',
    //   description: 'Looking for a roommate for a 2-bedroom apartment',
    //   price: 'Free',
    //   contact: 'emily.johnson@example.com',
    // },
    // {
    //   id: 7,
    //   title: 'Guitar Lessons',
    //   description: 'Professional guitar lessons, all levels welcome',
    //   price: '$30/hour',
    //   contact: 'david.miller@example.com',
    // },
    // {
    //   id: 8,
    //   title: 'Furniture Set',
    //   description: 'Complete living room furniture set, great condition',
    //   price: '$500',
    //   contact: 'lisa.white@example.com',
    // },
    // {
    //   id: 9,
    //   title: 'Tutoring Services',
    //   description: 'Math and Physics tutoring, experienced tutor',
    //   price: '$25/hour',
    //   contact: 'alex.tutor@example.com',
    // },
    // Add more offers as needed
  ]);

  const [user, setUser] = useState(null);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const { instance, accounts } = useMsal();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      const currentUser = accounts[0];
      setUser({
        name: currentUser.username,
        email: currentUser.username, // Assuming the email is the username
        profilePic: 'https://i.stack.imgur.com/GsDIl.jpg' // Placeholder image URL
      });
    const getProduct= ()=>{
        fetch("http://localhost/react/api/index.php")
        .then(res=>{ return res.json()})
        .then(data=>{ setPostings(data)})
        .catch(error=>{ console.log(error)});
    }
    getProduct();
    }
  }, [accounts]);


  const handleLogout = () => {
    instance.logoutPopup();
  };

  const handleAuth = (response) => {
    try {
      if (response && response.authResponse) {
        const { accessToken, idToken, expires } = response.authResponse;
        // Use the tokens and implement your logic (e.g., validate with a backend)
        console.log('Access Token:', accessToken);
        console.log('ID Token:', idToken);
        console.log('Expires:', expires);

        // Simulate user data (replace this with actual user data from your backend)
        setUser({
          name: 'John Doe',
          email: 'john.doe@example.com',
        });
      } else if (response && response.errorCode === 'user_cancelled') {
        // Handle user cancellation
        setError('User cancelled the authentication flow.');
      } else if (response && response.errorCode) {
        // Handle other errors
        setError(`Authentication error: ${response.errorCode} - ${response.errorMessage}`);
      }
    } catch (error) {
      console.error('Error during authentication handling:', error);
      // Refresh the page in case of an error
      window.location.reload();
    } finally {
      // Close the popup regardless of the authentication result
      setShowSignInPopup(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light text-dark">
        {user ? (
          <div>
            <img src={user.profilePic} alt="Profile" className="rounded-circle" style={{ width: "100px", height: "100px" }} />
            <h2 className="display-4">Welcome, {user.name}!</h2>
            <p className="lead">
      You are currently signed in as {user.email}. Enjoy your time exploring the marketplace :)
    </p><button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>   
        ) : (
            <div>
            <h2 className="display-4">Login to Marketplace @ UIUC</h2>
            <p className="lead">Sign in using your Microsoft UIUC account.</p>
            {error && <p className="text-danger">{error}</p>}
            <button
              className="btn btn-primary mt-3"
              onClick={() => setShowSignInPopup(true)}
            >
              Sign In
            </button>
            {showSignInPopup && (
              <MsalAuthenticationTemplate interactionType="popup" onAuthenticated={handleAuth}>
                {/* You can customize the content inside the popup if needed */}
              </MsalAuthenticationTemplate>
            )}
          </div>
        )}
      </div>
      {user ? (
        <div className="row mt-4">
        {postings.map((posting) => (
          <div key={posting.id} className="col-lg-4 col-md-6 mb-4">
            <OfferCard offer={posting} />
          </div>
        ))}
        </div>  
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default Profile;