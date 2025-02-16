import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SetService() {
  const [formData, setFormData] = useState({
    influencer_id: '', // Add influencer_id here
    serviceName: '',
    pricePerPost: '',
    description: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Assuming influencer_id is stored in local storage after login
    const influencerId = localStorage.getItem('influencer_id');
    setFormData((prevFormData) => ({
      ...prevFormData,
      influencer_id: influencerId,
    }));
  }, []);

  const serviceTemplates = [
    { name: 'Promosi di Instagram Story', description: 'Promosi produk atau jasa di Instagram Story selama 24 jam.' },
    { name: 'Promosi di Feed Instagram', description: 'Promosi produk atau jasa di feed Instagram dengan postingan permanen.' },
    { name: 'Promosi di Twitter', description: 'Promosi produk atau jasa di Twitter dengan tweet.' },
    { name: 'Promosi di Facebook', description: 'Promosi produk atau jasa di Facebook dengan postingan di timeline.' },
    { name: 'Promosi di TikTok', description: 'Promosi produk atau jasa di TikTok dengan video pendek.' },
  ];

  const handleTemplateChange = (e) => {
    const selectedTemplate = serviceTemplates.find(template => template.name === e.target.value);
    setFormData({
      ...formData,
      serviceName: selectedTemplate.name,
      description: selectedTemplate.description,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/star-1/backend/SetService.php', formData);
      console.log('Service submitted:', response.data);
      setShowModal(true);
    } catch (error) {
      console.error('There was an error submitting the service!', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const containerStyle = {
    padding: '50px 0',
    backgroundColor: '#001D3D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
  };

  const headerStyle = {
    position: 'absolute',
    top: '-50px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '100px',
    backgroundColor: '#FFC300',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    width: '80px',
    height: '40px',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <div style={headerStyle}>
          <img src="/landing/navbar/logo.png" alt="Logo" style={logoStyle} />
        </div>
        <h2 className="text-center mb-4" style={{ marginTop: '60px' }}>Service Kol</h2>
        <p className="text-center mb-4">Tentukan jasa promosi yang kamu sediakan dan harga untuk tiap post</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formServiceTemplate">
            <Form.Label>Pilih Template Jasa</Form.Label>
            <Form.Control as="select" onChange={handleTemplateChange} required>
              <option value="">Pilih Template Jasa</option>
              {serviceTemplates.map((template, index) => (
                <option key={index} value={template.name}>{template.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formServiceName">
            <Form.Label>Nama Jasa</Form.Label>
            <Form.Control
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
              required
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formPricePerPost">
            <Form.Label>Harga per Post</Form.Label>
            <Form.Control
              type="number"
              name="pricePerPost"
              value={formData.pricePerPost}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              readOnly
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: '#FFC300', color: 'blue' }}
          >
            Simpan
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Jasa Berhasil Disimpan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaCheckCircle size={50} color="green" />
          <p className="mt-3">Jasa promosi kamu telah berhasil disimpan!</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/influencer/login">
            <Button variant="primary" onClick={handleCloseModal}>
              OK
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SetService;