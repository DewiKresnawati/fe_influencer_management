import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignSect() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    brandName: '',
    picName: '',
    picPhone: '',
    province: '',
    city: '',
    referralCode: '',
  });
  const [isValidated, setIsValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [manualInput, setManualInput] = useState(false);

  useEffect(() => {
    // Fetch provinces from API
    axios.get('https://alamat.thecloudalert.com/api/provinsi/get/')
      .then(response => {
        setProvinces(response.data.result);
      })
      .catch(error => {
        console.error('There was an error fetching the provinces!', error);
        setManualInput(true);
      });
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setFormData({ ...formData, province: provinceId, city: '' });

    // Fetch cities based on selected province
    axios.get(`https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`)
      .then(response => {
        setCities(response.data.result);
      })
      .catch(error => {
        console.error('There was an error fetching the cities!', error);
        setManualInput(true);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleValidationChange = (e) => {
    setIsValidated(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke backend PHP 
    const dataToSend = { ...formData, action: 'register' };
    console.log('Data to send:', dataToSend); // Log data yang akan dikirim
    axios.post('http://localhost/star-1/backend/brand/register.php', JSON.stringify(dataToSend), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Form submitted:', response.data);
        setShowModal(true);
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
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
          <h2 className="text-center mb-4" style={{ marginTop: '60px' }}>Daftar Brand</h2>
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
            <Form.Group controlId="formBrandName">
              <Form.Label>Nama Brand</Form.Label>
              <Form.Control
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPicName">
              <Form.Label>Nama PIC</Form.Label>
              <Form.Control
                type="text"
                name="picName"
                value={formData.picName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPicPhone">
              <Form.Label>Nomor Telepon PIC</Form.Label>
              <Form.Control
                type="text"
                name="picPhone"
                value={formData.picPhone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProvince">
              <Form.Label>Pilih Provinsi</Form.Label>
              {manualInput ? (
                <Form.Control
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <Form.Control
                  as="select"
                  name="province"
                  value={formData.province}
                  onChange={handleProvinceChange}
                  required
                >
                  <option value="">Pilih Provinsi</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>{province.text}</option>
                  ))}
                </Form.Control>
              )}
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>Pilih Kota</Form.Label>
              {manualInput ? (
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <Form.Control
                  as="select"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.province}
                >
                  <option value="">Pilih Kota</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.text}</option>
                  ))}
                </Form.Control>
              )}
            </Form.Group>
            <Form.Group controlId="formReferralCode">
              <Form.Label>Kode Referal (Opsional)</Form.Label>
              <Form.Control
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formValidation">
              <Form.Check
                type="checkbox"
                label="Saya mengonfirmasi bahwa data yang dimasukkan sudah benar dan mengikuti syarat ketentuan Star Powers"
                checked={isValidated}
                onChange={handleValidationChange}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!isValidated}
              style={{ backgroundColor: '#FFC300', color: 'blue' }}
            >
              Daftar
            </Button>
          </Form>
          <Link to="/" className="btn btn-link mt-3">
            <FaArrowLeft /> Kembali
          </Link>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrasi Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaCheckCircle size={50} color="green" />
          <p className="mt-3">Anda telah berhasil mendaftar sebagai brand!</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/brand">
            <Button variant="primary" onClick={handleCloseModal}>
              OK
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignSect;