import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container, Row, Col, Form, Table, Alert, Button, Modal, Image } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { FaInstagram } from 'react-icons/fa';

function Influencer() {
  const influencerChartRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [influencers, setInfluencers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchInfluencers();
    fetchProvinces();
  }, []);

  const fetchInfluencers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/influencers/');
      setInfluencers(response.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data!', error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://alamat.thecloudalert.com/api/provinsi/get/');
      setProvinces(response.data.result);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data provinsi!', error);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(`https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`);
      setCities(response.data.result);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data kota!', error);
    }
  };

  const getDataByTimeRange = useCallback((range) => {
    const startDate = new Date('2025-01-01');
    const groupedData = influencers.reduce((acc, influencer) => {
      const date = new Date(influencer.registration_date);
      if (date >= startDate) {
        const dateString = date.toLocaleDateString();
        if (!acc[dateString]) {
          acc[dateString] = 0;
        }
        acc[dateString]++;
      }
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Jumlah Influencer yang Mendaftar',
          data: data,
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.8)',
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
  }, [influencers]);

  useEffect(() => {
    const influencerChart = new Chart(influencerChartRef.current, {
      type: 'line',
      data: getDataByTimeRange(timeRange),
      options: {
        scales: {
          x: {
            ticks: {
              color: '#333',
            },
          },
          y: {
            ticks: {
              color: '#333',
            },
          },
        },
      },
    });

    return () => {
      influencerChart.destroy();
    };
  }, [timeRange, getDataByTimeRange]);

  const handleClose = () => setShow(false);
  const handleShow = (influencer) => {
    setSelectedInfluencer(influencer);
    fetchCities(influencer.province);
    setShow(true);
  };

  const getProvinceName = (provinceId) => {
    const province = provinces.find((prov) => prov.id === provinceId);
    return province ? province.text : 'Unknown';
  };

  const getCityName = (cityId) => {
    const city = cities.find((city) => city.id === cityId);
    return city ? city.text : 'Unknown';
  };

  const containerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    return (
      (filterType === '' || influencer.influencer_category.toLowerCase().includes(filterType.toLowerCase())) &&
      (searchTerm === '' || influencer.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <Container style={containerStyle}>
      <Row>
        <Col>
          <h2>Data Influencer</h2>
          <Form.Group controlId="timeRange">
            <Form.Label>Filter berdasarkan Waktu</Form.Label>
            <Form.Control
              as="select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="all">Semua Waktu</option>
              <option value="week">1 Minggu Terakhir</option>
              <option value="month">1 Bulan Terakhir</option>
              <option value="year">1 Tahun Terakhir</option>
            </Form.Control>
          </Form.Group>
          <canvas ref={influencerChartRef}></canvas>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Label>Cari berdasarkan Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="filterType" className="mt-3">
              <Form.Label>Filter berdasarkan Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan kategori"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Daftar Influencer</h3>
          {filteredInfluencers.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Kategori</th>
                  <th>Pengikut</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredInfluencers.map((influencer, index) => (
                  <tr key={index}>
                    <td>{influencer.full_name}</td>
                    <td>{influencer.influencer_category}</td>
                    <td>{influencer.followers_count}</td>
                    <td>
                      <Button variant="info" onClick={() => handleShow(influencer)}>
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="warning">Influencer tidak ditemukan</Alert>
          )}
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Influencer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInfluencer && (
            <Container fluid className="p-4" style={{ backgroundColor: '#0D1B2A', color: '#ffffff' }}>
              <Row>
                <Col md={5} className="text-center">
                  <Image src={`http://localhost/star-1/backend/${selectedInfluencer.profile_picture}`} className="mb-3 custom-image" />
                </Col>
                <Col md={7}>
                  <Row className="mb-3">
                    <Col>
                      <FaInstagram style={{ width: '30px', height: '30px' }} />
                      <h5 className="d-inline-block ms-2">{selectedInfluencer.full_name}</h5>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <p>Jenis Kelamin: {selectedInfluencer.gender}</p>
                      <p>Asal Provinsi: {getProvinceName(selectedInfluencer.province)}</p>
                      <p>Asal Kota: {getCityName(selectedInfluencer.city)}</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={3}>
                      <h6>Followers</h6>
                      <p className="text-warning">{selectedInfluencer.followers_count}</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <h6>Service</h6>
                      <p>{selectedInfluencer.service}</p>
                    </Col>
                    <Col>
                      <h6>Kategori</h6>
                      <p>{selectedInfluencer.influencer_category}</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <h5 className="text-warning">HIGHLY RECOMMENDED</h5>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Influencer;