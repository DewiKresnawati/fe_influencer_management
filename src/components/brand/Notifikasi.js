import React, { useState, useEffect } from "react";
import { Button, Spinner, Row, Col, Card, Modal } from "react-bootstrap";
import axios from "axios";

function Notifikasi() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [paidCampaigns, setPaidCampaigns] = useState([]);

  useEffect(() => {
    const brandId = localStorage.getItem("brand_id");

    if (!brandId) {
      console.error("Brand ID tidak ditemukan di localStorage");
      return;
    }

    axios
      .get(
        `https://mesindigital.xyz/influence-be/get_campaigns.php?brand_id=${brandId}`
      )
      .then((response) => {
        setCampaigns(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns!", error);
        setLoading(false);
      });
  }, []);

  const handleShowPaymentModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handlePayment = (campaign) => {
    const paymentData = {
      campaign_id: campaign.id,
      service_id: campaign.service_id,
      influencer_id: campaign.influencer_id,
      brand_id: localStorage.getItem("brand_id"),
    };

    axios
      .post(
        "https://mesindigital.xyz/influence-be/midtrans/payment.php",
        paymentData
      )
      .then((response) => {
        if (response.data.order_id && response.data.payment_url) {
          window.open(response.data.payment_url, "_blank");

          // Tunggu beberapa detik sebelum memperbarui status di database
          setTimeout(() => {
            axios
              .post("https://mesindigital.xyz/influence-be/paid.php", {
                campaign_id: campaign.id,
              })
              .then((updateResponse) => {
                if (updateResponse.data.success) {
                  setPaidCampaigns((prev) => [...prev, campaign.id]);

                  // Perbarui status kampanye di UI
                  setCampaigns((prevCampaigns) =>
                    prevCampaigns.map((c) =>
                      c.id === campaign.id
                        ? { ...c, status: "Telah Dibayar" }
                        : c
                    )
                  );
                } else {
                  console.error(
                    "Gagal memperbarui status pembayaran di database."
                  );
                }
              })
              .catch((error) => {
                console.error(
                  "Error saat memperbarui status pembayaran:",
                  error
                );
              });
          }, 5000); // Tunggu 5 detik
        } else {
          alert("Gagal mendapatkan URL pembayaran.");
        }
      })
      .catch((error) => {
        console.error("Kesalahan pembayaran:", error);
        alert("Terjadi kesalahan saat memproses pembayaran.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifikasi Kampanye</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <Col key={campaign.id} md={4}>
                <Card style={{ margin: "10px 0" }}>
                  <Card.Body>
                    <Card.Title>{campaign.name}</Card.Title>
                    <Card.Text>
                      Status: <span>{campaign.status}</span>
                    </Card.Text>
                    {campaign.status === "approved" &&
                      !paidCampaigns.includes(campaign.id) && (
                        <Button
                          variant="success"
                          onClick={() => handleShowPaymentModal(campaign)}
                        >
                          Bayar
                        </Button>
                      )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>Tidak ada kampanye yang sedang berlangsung.</p>
          )}
        </Row>
      )}

      <Modal show={showPaymentModal} onHide={handleClosePaymentModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Gateway Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCampaign && (
            <>
              <h4>{selectedCampaign.name}</h4>
              <p>Status: {selectedCampaign.status}</p>
              <Button
                variant="success"
                onClick={() => handlePayment(selectedCampaign)}
                disabled={paidCampaigns.includes(selectedCampaign.id)}
              >
                {paidCampaigns.includes(selectedCampaign.id)
                  ? "Sudah Dibayar"
                  : "Bayar Sekarang"}
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Notifikasi;
