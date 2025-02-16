import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container, Row, Col, Form, Table, Alert } from 'react-bootstrap';
import { Chart } from 'chart.js';
import axios from 'axios';

function Brand() {
  const brandChartRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [brands, setBrands] = useState([]);

  const allTimeData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
    datasets: [
      {
        label: 'Brands',
        data: [2, 3, 20, 5, 1, 4],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const lastYearData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
    datasets: [
      {
        label: 'Brands',
        data: [1, 2, 15, 4, 1, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const lastMonthData = {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    datasets: [
      {
        label: 'Brands',
        data: [1, 2, 5, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const lastWeekData = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Brands',
        data: [1, 1, 1, 2, 1, 1, 1],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.8)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  useEffect(() => {
    // Fetch brands from API
    axios.get('https://mesindigital.xyz/influence-be/admin/get_brands.php')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the brands!', error);
      });
  }, []);

  const getDataByTimeRange = useCallback((range) => {
    switch (range) {
      case 'week':
        return lastWeekData;
      case 'month':
        return lastMonthData;
      case 'year':
        return lastYearData;
      case 'all':
      default:
        return allTimeData;
    }
  }, []);

  useEffect(() => {
    const brandChart = new Chart(brandChartRef.current, {
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
      brandChart.destroy();
    };
  }, [timeRange, getDataByTimeRange]);

  const containerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const filteredBrands = brands.filter((brand) => {
    return (
      (filterType === '' || brand.type.toLowerCase().includes(filterType.toLowerCase())) &&
      (searchTerm === '' || brand.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <Container style={containerStyle}>
      <Row>
        <Col>
          <h2>Data Brand</h2>
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
          <canvas ref={brandChartRef}></canvas>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Label>Cari berdasarkan Nama Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="filterType" className="mt-3">
              <Form.Label>Filter berdasarkan Tipe</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan tipe"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Daftar Brand</h3>
          {filteredBrands.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nama Brand</th>
                  <th>Tipe</th>
                  <th>Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand, index) => (
                  <tr key={index}>
                    <td>{brand.brand_name}</td>
                    <td>{brand.type}</td>
                    <td>{brand.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="warning">Brand tidak ditemukan</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Brand;