import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container, Row, Col, Form, Table, Alert, Button, Modal } from 'react-bootstrap';
import { Chart } from 'chart.js';
import axios from 'axios';

function Home() {
  const transactionChartRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);

  const transactions = [
    { id: 1, brand: 'Brand1', influencer: 'Influencer1', campaign: 'Kampanye A', price: 150000, status: 'sukses' },
    { id: 2, brand: 'Brand2', influencer: 'Influencer2', campaign: 'Kampanye B', price: 200000, status: 'pending' },
    { id: 3, brand: 'Brand3', influencer: 'Influencer3', campaign: 'Kampanye C', price: 300000, status: 'dibatalkan' },
    { id: 4, brand: 'Brand4', influencer: 'Influencer4', campaign: 'Kampanye D', price: 250000, status: 'sukses' },
    { id: 5, brand: 'Brand5', influencer: 'Influencer5', campaign: 'Kampanye E', price: 400000, status: 'pending' },
    { id: 6, brand: 'Brand6', influencer: 'Influencer6', campaign: 'Kampanye F', price: 350000, status: 'sukses' },
  ];

  const allTimeData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
    datasets: [
      {
        label: 'Transaksi',
        data: [150, 200, 300, 250, 400, 350],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.8)',
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
        label: 'Transaksi',
        data: [100, 150, 200, 180, 220, 210],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.8)',
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
        label: 'Transaksi',
        data: [50, 70, 60, 80],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.8)',
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
        label: 'Transaksi',
        data: [10, 20, 15, 25, 30, 20, 25],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.8)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

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
    const transactionChart = new Chart(transactionChartRef.current, {
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
      transactionChart.destroy();
    };
  }, [timeRange, getDataByTimeRange]);

  const containerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      searchTerm === '' ||
      transaction.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.influencer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleTransfer = async (transaction) => {
    const amountToTransfer = transaction.price * 0.9;
    try {
      const response = await axios.get(`http://localhost/star-1/backend/getInfluencerBankAccounts.php?influencer=${transaction.influencer}`);
      setBankAccounts(response.data);
      setSelectedTransaction({ ...transaction, amountToTransfer });
      setShowModal(true);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data rekening bank!', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
    setBankAccounts([]);
  };

  return (
    <Container style={containerStyle}>
      <Row>
        <Col>
          <h2>Data Transaksi</h2>
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
          <canvas ref={transactionChartRef}></canvas>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Label>Cari berdasarkan Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Daftar Transaksi</h3>
          {filteredTransactions.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Influencer</th>
                  <th>Kampanye</th>
                  <th>Harga</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.brand}</td>
                    <td>{transaction.influencer}</td>
                    <td>{transaction.campaign}</td>
                    <td>{transaction.price}</td>
                    <td>{transaction.status}</td>
                    <td>
                      {transaction.status === 'sukses' && (
                        <Button variant="success" onClick={() => handleTransfer(transaction)}>
                          Transfer Uang
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="warning">Transaksi tidak ditemukan</Alert>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Uang ke Influencer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <>
              <p>Nama Influencer: {selectedTransaction.influencer}</p>
              <p>Jumlah Transfer: Rp {selectedTransaction.amountToTransfer.toLocaleString()}</p>
              <h5>Rekening Bank Influencer:</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Jenis Bank</th>
                    <th>Nomor Rekening</th>
                    <th>Nama Pemilik Rekening</th>
                  </tr>
                </thead>
                <tbody>
                  {bankAccounts.map((account, index) => (
                    <tr key={index}>
                      <td>{account.bank_type}</td>
                      <td>{account.account_number}</td>
                      <td>{account.account_holder}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Home;