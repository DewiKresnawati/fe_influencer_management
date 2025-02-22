import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import { Chart } from "chart.js/auto";
import axios from "axios";

function Home() {
  const transactionChartRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loadingBank, setLoadingBank] = useState(false);
  const [errorBank, setErrorBank] = useState(null);
  const [selectedInfluencerId, setSelectedInfluencerId] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "ss://mesindigital.xyz/influence-be/midtrans/transaction.php"
        );
        setTransactions(response.data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const storedConfirmedPayments = localStorage.getItem("confirmedPayments");
    if (storedConfirmedPayments) {
      setConfirmedPayments(JSON.parse(storedConfirmedPayments));
    }

    if (!transactions.length) return;

    const monthlyTotal = Array(12).fill(0);
    const monthlySuccess = Array(12).fill(0);
    const monthlyPending = Array(12).fill(0);

    transactions.forEach((t) => {
      const date = new Date(t.created_at);
      const month = date.getMonth();
      monthlyTotal[month] += 1;
      if (t.status === "success") {
        monthlySuccess[month] += 1;
      } else if (t.status === "pending") {
        monthlyPending[month] += 1;
      }
    });

    if (transactionChartRef.current) {
      if (transactionChartRef.current.chartInstance) {
        transactionChartRef.current.chartInstance.destroy();
      }

      const ctx = transactionChartRef.current.getContext("2d");
      transactionChartRef.current.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ],
          datasets: [
            {
              label: "Total Transaksi",
              data: monthlyTotal,
              borderColor: "rgba(54, 162, 235, 0.8)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
            },
            {
              label: "Transaksi Berhasil",
              data: monthlySuccess,
              borderColor: "rgba(75, 192, 75, 0.8)",
              backgroundColor: "rgba(75, 192, 75, 0.2)",
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
            },
            {
              label: "Transaksi Pending",
              data: monthlyPending,
              borderColor: "rgba(255, 99, 132, 0.8)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: { ticks: { color: "#333" } },
            y: { ticks: { color: "#333" } },
          },
        },
      });
    }

    return () => {
      if (
        transactionChartRef.current &&
        transactionChartRef.current.chartInstance
      ) {
        transactionChartRef.current.chartInstance.destroy();
      }
    };
  }, [transactions]);

  const handleShowBankAccounts = async (influencerId) => {
    setLoadingBank(true);
    setErrorBank(null);
    setSelectedInfluencerId(influencerId);

    try {
      const response = await axios.get(
        `ss://mesindigital.xyz/influence-be/influencerProfile.php?id=${influencerId}`
      );

      let bankData = [];

      if (Array.isArray(response.data.bank_accounts)) {
        bankData = response.data.bank_accounts.map((bank) => ({
          bank_account: bank.bank_account || "Tidak tersedia",
          account_number: bank.account_number || "Tidak tersedia",
          full_name: response.data.full_name || "Tidak tersedia",
          email: response.data.email || "Tidak tersedia",
          followers_count: response.data.followers_count || 0,
          instagram_link: response.data.instagram_link || "",
          influencer_category:
            response.data.influencer_category || "Tidak tersedia",
        }));
      } else if (response.data.bank_account && response.data.account_number) {
        bankData = [
          {
            bank_account: response.data.bank_account,
            account_number: response.data.account_number,
            full_name: response.data.full_name || "Tidak tersedia",
            email: response.data.email || "Tidak tersedia",
            followers_count: response.data.followers_count || 0,
            instagram_link: response.data.instagram_link || "",
            influencer_category:
              response.data.influencer_category || "Tidak tersedia",
          },
        ];
      } else {
        throw new Error("Unexpected bank account data format");
      }

      setBankAccounts(bankData);
      setShowBankModal(true);
    } catch (error) {
      setErrorBank("Gagal mengambil data rekening");
      console.error("Error fetching bank accounts:", error);
    } finally {
      setLoadingBank(false);
    }
  };

  const handleCloseBankModal = () => {
    setShowBankModal(false);
    setBankAccounts([]);
    setSelectedInfluencerId(null);
  };

  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    alert("Nomor rekening telah disalin");
  };

  const [confirmedPayments, setConfirmedPayments] = useState([]);

  const handlePaymentConfirmation = async () => {
    if (!selectedInfluencerId) {
      alert("Influencer ID tidak valid.");
      return;
    }

    try {
      const response = await axios.put(
        `https://mesindigital.xyz/influence-be/confirm_status.php?id=${selectedInfluencerId}`,
        new URLSearchParams({ confirm_status: "confirmed" }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.data.success) {
        alert("Pembayaran berhasil dikonfirmasi!");

        // Simpan ke state
        setConfirmedPayments((prev) => {
          const updatedPayments = [...prev, selectedInfluencerId];

          // Simpan ke localStorage
          localStorage.setItem(
            "confirmedPayments",
            JSON.stringify(updatedPayments)
          );
          return updatedPayments;
        });

        handleCloseBankModal();
      } else {
        alert("Gagal mengonfirmasi pembayaran");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengonfirmasi pembayaran");
      console.error("Error confirming payment:", error);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row>
        <Col>
          <h2>Data Transaksi</h2>
          <canvas ref={transactionChartRef}></canvas>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Daftar Transaksi</h3>
          {loading ? (
            <p>Memuat data..</p>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : transactions.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Brand Id</th>
                    <th>Harga</th>
                    <th>Status</th>
                    <th>Influencer ID</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((t) => (
                    <tr key={t.transaction_id}>
                      <td>{t.transaction_id}</td>
                      <td>{t.brand_id}</td>
                      <td>{t.amount}</td>
                      <td
                        style={{
                          color: t.status === "success" ? "green" : "red",
                        }}
                      >
                        {t.status}
                      </td>
                      <td>{t.influencer_id}</td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleShowBankAccounts(t.influencer_id)
                          }
                          variant={
                            confirmedPayments.includes(t.influencer_id)
                              ? "success"
                              : "primary"
                          }
                        >
                          Lihat Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination">
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <Alert variant="warning">Transaksi tidak ditemukan</Alert>
          )}
        </Col>
      </Row>

      {/* Modal Rekening */}
      <Modal show={showBankModal} onHide={handleCloseBankModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rekening Influencer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingBank ? (
            <p className="text-center">Memuat...</p>
          ) : errorBank ? (
            <Alert variant="danger">{errorBank}</Alert>
          ) : bankAccounts.length > 0 ? (
            <ul className="list-group">
              {bankAccounts.map((bank, index) => (
                <li key={index} className="list-group-item">
                  <strong>Nama:</strong> {bank.full_name} <br />
                  <strong>Email:</strong> {bank.email} <br />
                  <strong>Followers:</strong> {bank.followers_count} <br />
                  <strong>Instagram:</strong>{" "}
                  <a
                    href={bank.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bank.instagram_link}
                  </a>{" "}
                  <br />
                  <strong>Kategori:</strong> {bank.influencer_category} <br />
                  <hr />
                  <strong>Bank:</strong> {bank.bank_account} <br />
                  <strong>Nomor Rekening:</strong> {bank.account_number}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">
              Tidak ada rekening tersedia.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() =>
              handleCopy(
                bankAccounts.length > 0 ? bankAccounts[0].account_number : ""
              )
            }
          >
            Copy
          </Button>
          <Button
            variant="outline-success"
            onClick={handlePaymentConfirmation}
            disabled={confirmedPayments.includes(selectedInfluencerId)}
          >
            Konfirmasi Pembayaran
          </Button>
          <Button variant="danger" onClick={handleCloseBankModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Home;
