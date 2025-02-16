import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
  const sidebarStyle = {
    height: '100vh',
    backgroundColor: '#001D3D',
    color: 'white',
    padding: '20px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '250px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 0',
    display: 'block',
  };

  const headerLinkStyle = {
    ...linkStyle,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  return (
    <div style={sidebarStyle}>
      <Nav className="flex-column">
        <Link to="/admin/dashboard" style={headerLinkStyle}>Admin Dashboard</Link>
        <Link to="/admin/dashboard/transaksi" style={linkStyle}>Transaksi</Link>
        <Link to="/admin/dashboard/influencers" style={linkStyle}>Influencers</Link>
        <Link to="/admin/dashboard/brands" style={linkStyle}>Brands</Link>
        <Link to="/admin/dashboard/vip" style={linkStyle}>Starpower VIP</Link>
        <Link to="/admin/dashboard/articles" style={linkStyle}>Articles</Link>
        <Link to="/admin/dashboard/faq" style={linkStyle}>FAQ</Link>
        <Link to="/admin/dashboard/bank-account" style={linkStyle}>Bank Account</Link> 
      </Nav>
    </div>
  );
}

export default Sidebar;