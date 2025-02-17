import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, Table, Alert, Button, Modal, Pagination } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

function Home() {
  const transactionChartRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Modal for Bank Account
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loadingBank, setLoadingBank] = useState(false);
  const [errorBank, setErrorBank] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://mesindigital.xyz/influence-be/midtrans/transaction.php');
        setTransactions(response.data);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (!transactions.length) return;

    const monthlyTotal = Array(12).fill(0);
    const monthlySuccess = Array(12).fill(0);
    const monthlyPending = Array(12).fill(0);
  
    transactions.forEach((t) => {
      const date = new Date(t.created_at);
      const month = date.getMonth();
      monthlyTotal[month] += 1;
      if (t.status === 'success') {
        monthlySuccess[month] += 1;
      } else if (t.status === 'pending') {
        monthlyPending[month] += 1;
      }
    });
  
    if (transactionChartRef.current) {
      if (transactionChartRef.current.chartInstance) {
        transactionChartRef.current.chartInstance.destroy();
      }
  
      const ctx = transactionChartRef.current.getContext('2d');
      transactionChartRef.current.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
          ],
          datasets: [
            {
              label: 'Total Transaksi',
              data: monthlyTotal,
              borderColor: 'rgba(54, 162, 235, 0.8)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
            },
            {
              label: 'Transaksi Berhasil',
              data: monthlySuccess,
              borderColor: 'rgba(75, 192, 75, 0.8)',
              backgroundColor: 'rgba(75, 192, 75, 0.2)',
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
            },
            {
              label: 'Transaksi Pending',
              data: monthlyPending,
              borderColor: 'rgba(255, 99, 132, 0.8)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { ticks: { color: '#333' } },
            y: { ticks: { color: '#333' } }
          }
        }
      });
    }

    return () => {
      if (transactionChartRef.current && transactionChartRef.current.chartInstance) {
        transactionChartRef.current.chartInstance.destroy();
      }
    };
  }, [transactions]);

  const handleShowDetail = (transaction) => {
    setSelectedDetail(transaction);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setSelectedDetail(null);
  };

  const handleShowBankAccounts = async (influencerId) => {
    setShowBankModal(true);
    setLoadingBank(true);
    setErrorBank(null);
    try {
      const response = await axios.get(`https://mesindigital.xyz/influence-be/getInfluencerById.php?influencer=${influencerId}`);
      setBankAccounts(response.data);
    } catch (error) {
      setErrorBank('Gagal mengambil data rekening');
      console.error(error);
    } finally {
      setLoadingBank(false);
    }
  };

  const handleCloseBankModal = () => {
    setShowBankModal(false);
    setBankAccounts([]);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Row>
        <Col>
          <h2>Data Transaksi</h2>
          <canvas ref={transactionChartRef}></canvas>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form.Group controlId="searchTerm">
            <Form.Label>Cari berdasarkan Username</Form.Label>
            <Form.Control type="text" placeholder="Masukkan username" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Daftar Transaksi</h3>
          {loading ? <p>Memuat data..</p> : error ? <Alert variant='danger'>{error}</Alert> : transactions.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Brand Id</th>
                    <th>Harga</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((t) => (
                    <tr key={t.transaction_id}>
                      <td>{t.transaction_id}</td>
                      <td>{t.brand_id}</td>
                      <td>{t.amount}</td>
                      <td style={{ color: t.status === 'success' ? 'green' : 'red' }}>
                      {t.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : <Alert variant="warning">Transaksi tidak ditemukan</Alert>}
        </Col>
      </Row>

      {/* Modal Rekening */}
      <Modal show={showBankModal} onHide={handleCloseBankModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rekening Influencer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingBank ? <p>Memuat...</p> : errorBank ? <Alert variant="danger">{errorBank}</Alert> : (
            <ul>
              {bankAccounts.map((bank, index) => (
                <li key={index}>{bank.bank_name} - {bank.account_number}</li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBankModal}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Home;
