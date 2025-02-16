import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function StartLogin() {
  const [activeButton] = useState(null);

  const sectionStyle = {
    height: '100vh',
    backgroundColor: '#001D3D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  const leftColStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
  };

  const rightColStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonStyle = (button) => ({
    backgroundColor: activeButton === button ? '#FFC300' : '#FFC300',
    color: activeButton === button ? '#001D3D' : '#001D3D',
    fontWeight: 'bold',
    border: 'none',
    marginRight: '10px',
    padding: '10px 20px',
  });

  return (
    <section style={sectionStyle}>
      <Container>
        <Row>
          <Col md={6} style={leftColStyle}>
            <h1>Perluas Pengaruh Brand Anda dengan Starpowers</h1>
            <p>Dengan Starpowers Brand Dashboard, Anda dapat dengan mudah berkolaborasi dengan influencer untuk menjangkau konsumen di seluruh Indonesia.</p>
            <div>
              <Link to="/influencer/formlogin" className="btn" style={buttonStyle('login')}>
                Login
              </Link>
              <Link to="/influencer/signup" className="btn" style={buttonStyle('register')}>
                    Register
              </Link>
            </div>
          </Col>
          <Col md={6} style={rightColStyle}>
            <img src="/influencer/Logo.png" alt="Starpowers Logo" style={{ maxWidth: '100%', height: 'auto' }} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default StartLogin;