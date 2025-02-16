import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';

function Sidebar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');

  const sidebarStyle = {
    height: '100vh',
    width: '250px',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#001D3D',
    color: 'white',
    padding: '20px',
    border: '2px solid #FFC300',
  };

  const contentStyle = {
    marginTop: '100px',
  };

  const navLinkStyle = {
    color: '#FFC300',
    fontWeight: 'bold',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginBottom: '10px',
    textDecoration: 'none',
  };

  const navLinkHoverStyle = {
    backgroundColor: '#FFC300',
    color: '#001D3D',
  };

  const navLinkSelectedStyle = {
    backgroundColor: '#FFC300',
    color: '#001D3D',
  };

  const handleNavClick = (path) => {
    setSelected(path);
    navigate(path);
  };

  return (
    <ErrorBoundary>
      <div style={sidebarStyle}>
        <div style={contentStyle}>
          <h3 style={{ color: '#FFC300', fontWeight: 'bold' }}>Menu</h3>
          <Nav className="flex-column">
            <Nav.Link
              style={selected === '/influencer/dashboard/campain' ? navLinkSelectedStyle : navLinkStyle}
              onClick={() => handleNavClick('/influencer/dashboard/campain')}
              onMouseEnter={(e) => {
                if (selected !== '/influencer/dashboard/campain') {
                  e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor;
                  e.target.style.color = navLinkHoverStyle.color;
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== '/influencer/dashboard/campain') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = navLinkStyle.color;
                }
              }}
            >
              Campain
            </Nav.Link>
            <Nav.Link
              style={selected === '/influencer/dashboard/akun' ? navLinkSelectedStyle : navLinkStyle}
              onClick={() => handleNavClick('/influencer/dashboard/akun')}
              onMouseEnter={(e) => {
                if (selected !== '/influencer/dashboard/akun') {
                  e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor;
                  e.target.style.color = navLinkHoverStyle.color;
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== '/influencer/dashboard/akun') {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = navLinkStyle.color;
                }
              }}
            >
              Akun
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Sidebar;