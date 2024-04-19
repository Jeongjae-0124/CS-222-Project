import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import '../index.css'; // Import the custom styles

const Navbar = () => {
  return (
    <BootstrapNavbar className="navbar-custom fixed-top" expand="lg">
      <Link className="navbar-brand" to="/">
        marketplace@uiuc
      </Link>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className="nav-link" to="/" activeClassName="highlight-on-hover">
            Home
          </Link>
          <Link className="nav-link" to="/profile" activeClassName="highlight-on-hover">
            Profile
          </Link>
          <Link className="nav-link" to="/postings" activeClassName="highlight-on-hover">
            Offers
          </Link> 
          <Link className="nav-link" to="/helppage" activeClassName="highlight-on-hover">
            Help
          </Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
