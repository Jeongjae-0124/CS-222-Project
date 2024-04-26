// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import { msalConfig } from '../msalConfig.js';
import NewOfferForm from './NewOfferForm';
import OfferCard from './OfferCard';

const Profile = () => {
  const [postings, setPostings] = useState([]);
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
      
      const getProduct = () => {
        const encodedEmail = encodeURIComponent(currentUser.username);
        fetch(`http://localhost/react/api/profile.php?userID=${encodedEmail}`)
          .then(res => res.json())
          .then(data => {
            setPostings(data);
          })
          .catch(err => {
            console.log(error)
          });
      };
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

    {user
        ? (<div className="row mt-4">
            {
                postings.length > 0 && postings.map((posting) => (<div key={posting.id} className="col-lg-4 col-md-6 mb-4">
                    <OfferCard offer={posting}/>
                </div>))
            }
        </div>)
        : (<div>
            {/* Optionally, add UI elements to indicate there are no postings or the user is not logged in */}
        </div>)}

    </div>
  );
};

export default Profile;