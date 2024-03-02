// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import HelpPage from './components/HelpPage';  // Import HelpPage component
import Postings from './components/Postings';
import Threads from './components/Threads';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/helppage" element={<HelpPage />} />  {/* Use HelpPage component here */}
        <Route path="/postings" element={<Postings />} />
        <Route path="/threads" element={<Threads />} />
      </Routes>
    </Router>
  );
};

export default App;
