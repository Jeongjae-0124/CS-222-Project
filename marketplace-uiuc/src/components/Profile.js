// src/components/Profile.js
// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import { msalConfig } from '../msalConfig.js';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const { instance, accounts } = useMsal();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    if (accounts.length > 0) {
      const currentUser = accounts[0];
      // Assuming you have a way to get the user's profile picture URL
      // This could be fetched from a backend service or from the account info
      const userProfilePictureUrl = 'https://via.placeholder.com/150'; // Placeholder image URL
      setUser({
        name: currentUser.username,
        email: currentUser.username, // Assuming the email is the username
        profilePictureUrl: userProfilePictureUrl, // Add the profile picture URL to the user state
      });
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
        const userProfilePictureUrl = 'https://via.placeholder.com/150'; // Placeholder image URL for demonstration
        setUser({
          name: 'John Doe',
          email: 'john.doe@example.com',
          profilePictureUrl: userProfilePictureUrl, // Set the user profile picture URL
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
            {/* Display the user's profile picture if available */}
            {user.profilePictureUrl && (
              <img
                src={user.profilePictureUrl}
                alt="Profile"
                className="mb-3"
                style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }}
              />
            )}
            <h2 className="display-4">{user.name}</h2>
            
            <button className="btn btn-danger" onClick={handleLogout}>
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
    </div>
  );
};

export default Profile;

