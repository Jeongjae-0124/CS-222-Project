// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import '../index.css'; // Import the custom styles

const Navbar = () => {
  return (
    <BootstrapNavbar className="navbar-custom" expand="lg">
      <Link className="navbar-brand" to="/">
        marketplace@uiuc
      </Link>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
          <Link className="nav-link" to="/messages">
            Messages
          </Link>
          <Link className="nav-link" to="/postings">
            Postings
          </Link> 
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
