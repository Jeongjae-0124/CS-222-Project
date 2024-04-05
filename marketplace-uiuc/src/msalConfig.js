// msalConfig.js
export const msalConfig = {
    auth: {
      clientId: '0f983ffc-133f-43ab-b964-c274c006de49', // Application (client) ID
      authority: 'https://login.microsoftonline.com/44467e6f-462c-4ea2-823f-7800de5434e3', // Directory (tenant) ID
      // redirectUri: 'https://uiucmarketplace.web.illinois.edu/profile',
    redirectUri: 'http://localhost:3000/',
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
  };
  