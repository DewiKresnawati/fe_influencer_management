import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';

function NavbarAdmin() {
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: '250px', // Menambahkan padding kiri untuk memberikan ruang pada sidebar
    width: 'calc(100% - 250px)', // Mengurangi lebar navbar agar tidak menimpa sidebar
    zIndex: 1000,
    backgroundColor: '#001D3D',
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        <Navbar.Brand className="p-3" href="/">
          <img src="/landing/navbar/logo.png" alt="Starpowers" />
        </Navbar.Brand>
        <Button variant="outline-light" className="ml-auto" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavbarAdmin;