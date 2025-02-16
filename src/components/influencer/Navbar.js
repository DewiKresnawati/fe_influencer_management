import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function InfluencerNavigationBar() {
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: '#001D3D',
  };

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        <Navbar.Brand className="p-3" as={Link} to="/">
          <img src="/landing/navbar/logo.png" alt="Starpowers" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-white gap">
            <Nav.Link className="text-white nav-link-custom" as={Link} to="/lp-influencer">Influencer</Nav.Link>
            <Nav.Link className="text-white nav-link-custom" as={Link} to="/lp-vip">Starpowers VIP</Nav.Link>
            <Nav.Link className="text-white nav-link-custom" as={Link} to="/lp-faq">FAQ</Nav.Link>
            <Nav.Link className="text-white nav-link-custom" as={Link} to="/lp-news">News</Nav.Link>
            <Button variant="outline-light" as={Link} to="/">Join Us</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InfluencerNavigationBar;