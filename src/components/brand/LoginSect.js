import React, { useState } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginSect() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/brands/login', { ...formData, action: 'login' })
      .then(response => {
        if (response.data.success) {
          console.log('Login successful:', response.data);
          // Hapus brand_id dari localStorage jika sudah ada
          localStorage.removeItem('brand_id');
          // Simpan brand_id ke localStorage
          localStorage.setItem('brand_id', response.data.brand_id);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            navigate('/brand/dashboard/marketplace');
          }, 2000);
        } else {
          setErrorMessage(response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        setErrorMessage('There was an error logging in!');
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div style={{ padding: '50px 0', backgroundColor: '#001D3D', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '500px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '100px', backgroundColor: '#FFC300', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img src="/landing/navbar/logo.png" alt="Logo" style={{ width: '80px', height: '40px' }} />
          </div>
          <h2 className="text-center mb-4" style={{ marginTop: '60px' }}>Login Brand</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <div className="input-group-append">
                  <Button variant="outline-secondary" onClick={handleTogglePassword}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </InputGroup>
            </Form.Group>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: '#FFC300', color: 'blue' }}
            >
              Login
            </Button>
          </Form>
          <Link to="/brand" className="btn btn-link mt-3">
            <FaArrowLeft /> Kembali
          </Link>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaCheckCircle size={50} color="green" />
          <p className="mt-3">Anda telah berhasil login!</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/brand/dashboard">
            <Button variant="primary" onClick={handleCloseModal}>
              OK
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginSect;