import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function NavbarBrand() {
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: '250px', // Adding left padding to make room for the sidebar
    width: 'calc(100% - 250px)', // Reducing navbar width to avoid overlapping with the sidebar
    zIndex: 1000,
    backgroundColor: '#001D3D',
  };

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        <Navbar.Brand className="p-3" href="/">
          <img src="/landing/navbar/logo.png" alt="Starpowers" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarBrand;