import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

function EditService({ show, handleClose }) {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '', duration: '' });
  const [editServiceId, setEditServiceId] = useState(null);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const serviceTemplates = [
    { name: 'Promosi di Instagram Story', description: 'Promosi produk atau jasa di Instagram Story selama 24 jam.' },
    { name: 'Promosi di Feed Instagram', description: 'Promosi produk atau jasa di feed Instagram dengan postingan permanen.' },
    { name: 'Promosi di Twitter', description: 'Promosi produk atau jasa di Twitter dengan tweet.' },
    { name: 'Promosi di Facebook', description: 'Promosi produk atau jasa di Facebook dengan postingan di timeline.' },
    { name: 'Promosi di TikTok', description: 'Promosi produk atau jasa di TikTok dengan video pendek.' },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost/star-1/backend/SetService.php');
        console.log('Fetched services:', response.data.services); // Log the fetched services
        setServices(response.data.services);
      } catch (error) {
        console.error('There was an error fetching the services!', error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (e, id) => {
    const { name, value } = e.target;
    setServices(services.map(service => service.id === id ? { ...service, [name]: value } : service));
  };

  const handleNewServiceChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleTemplateChange = (e) => {
    const selectedTemplate = serviceTemplates.find(template => template.name === e.target.value);
    if (selectedTemplate) {
      setNewService({ ...newService, name: selectedTemplate.name, description: selectedTemplate.description });
    }
  };

  const addService = async () => {
    try {
      const influencerId = localStorage.getItem('influencer_id');
      const response = await axios.post('http://localhost/star-1/backend/SetService.php', {
        action: 'create',
        influencer_id: influencerId,
        serviceName: newService.name,
        pricePerPost: newService.price,
        description: newService.description,
        duration: newService.duration,
      });
      if (response.data.success) {
        setServices([...services, { ...newService, id: services.length + 1 }]);
        setNewService({ name: '', description: '', price: '', duration: '' });
      } else {
        console.error('There was an error adding the service!', response.data.error);
      }
    } catch (error) {
      console.error('There was an error adding the service!', error);
    }
  };

  const editService = async (id) => {
    try {
      const service = services.find(service => service.id === id);
      const response = await axios.post('http://localhost/star-1/backend/SetService.php', {
        action: 'update',
        id: service.id,
        serviceName: service.name,
        pricePerPost: service.price,
        description: service.description,
        duration: service.duration,
      });
      if (response.data.success) {
        setEditServiceId(null);
        setShowEditSuccess(true);
      } else {
        console.error('There was an error editing the service!', response.data.error);
      }
    } catch (error) {
      console.error('There was an error editing the service!', error);
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await axios.post('http://localhost/star-1/backend/SetService.php', {
        action: 'delete',
        id,
      });
      if (response.data.success) {
        setServices(services.filter(service => service.id !== id));
        setShowDeleteSuccess(true);
      } else {
        console.error('There was an error deleting the service!', response.data.error);
      }
    } catch (error) {
      console.error('There was an error deleting the service!', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {services.map(service => (
            <ListGroup.Item key={service.id}>
              {editServiceId === service.id ? (
                <Form>
                  <Form.Group controlId={`formServiceName${service.id}`}>
                    <Form.Label>Nama Service</Form.Label>
                    <Form.Control type="text" name="name" value={service.service_name} onChange={(e) => handleServiceChange(e, service.id)} />
                  </Form.Group>
                  <Form.Group controlId={`formServiceDescription${service.id}`}>
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control type="text" name="description" value={service.description} onChange={(e) => handleServiceChange(e, service.id)} />
                  </Form.Group>
                  <Form.Group controlId={`formServicePrice${service.id}`}>
                    <Form.Label>Harga</Form.Label>
                    <Form.Control type="text" name="price" value={service.price_per_post} onChange={(e) => handleServiceChange(e, service.id)} />
                  </Form.Group>
                  <Form.Group controlId={`formServiceDuration${service.id}`}>
                    <Form.Label>Durasi</Form.Label>
                    <Form.Control type="text" name="duration" value={service.duration} onChange={(e) => handleServiceChange(e, service.id)} />
                  </Form.Group>
                  <Button variant="primary" onClick={() => editService(service.id)}>Simpan</Button>
                </Form>
              ) : (
                <>
                  <div><strong>Nama Service:</strong> {service.service_name}</div>
                  <div><strong>Deskripsi:</strong> {service.description}</div>
                  <div><strong>Harga:</strong> {service.price_per_post}</div>
                  <div><strong>Durasi:</strong> {service.duration}</div>
                  <Button variant="warning" onClick={() => setEditServiceId(service.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => deleteService(service.id)}>Hapus</Button>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="mt-4">Tambah Service Baru</h5>
        <Form>
          <Form.Group controlId="formNewServiceTemplate">
            <Form.Label>Pilih Template Service</Form.Label>
            <Form.Control as="select" onChange={handleTemplateChange}>
              <option value="">Pilih Template</option>
              {serviceTemplates.map((template, index) => (
                <option key={index} value={template.name}>{template.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formNewServiceName">
            <Form.Label>Nama Service</Form.Label>
            <Form.Control type="text" name="name" value={newService.name} onChange={handleNewServiceChange} />
          </Form.Group>
          <Form.Group controlId="formNewServiceDescription">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control type="text" name="description" value={newService.description} onChange={handleNewServiceChange} />
          </Form.Group>
          <Form.Group controlId="formNewServicePrice">
            <Form.Label>Harga</Form.Label>
            <Form.Control type="text" name="price" value={newService.price} onChange={handleNewServiceChange} />
          </Form.Group>
          <Form.Group controlId="formNewServiceDuration">
            <Form.Label>Durasi</Form.Label>
            <Form.Control type="text" name="duration" value={newService.duration} onChange={handleNewServiceChange} />
          </Form.Group>
          <Button variant="primary" onClick={addService}>Tambah Service</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Tutup</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditService;