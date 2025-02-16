import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function LoginSect({ onLoginClick }) {
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

  const buttonStyle = {
    backgroundColor: '#FFC300',
    color: '#001D3D',
    fontWeight: 'bold',
    border: 'none',
    padding: '10px 20px',
  };

  return (
    <section style={sectionStyle}>
      <Container>
        <Row>
          <Col md={6} style={leftColStyle}>
            <h1>Admin Login</h1>
            <p>Login to manage the Starpowers platform and oversee influencer collaborations.</p>
            <Button style={buttonStyle} onClick={onLoginClick}>
              Login
            </Button>
          </Col>
          <Col md={6} style={rightColStyle}>
            <img src="/influencer/Logo.png" alt="Starpowers Logo" style={{ maxWidth: '100%', height: 'auto' }} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginSect;