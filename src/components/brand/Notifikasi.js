import React, { useState, useEffect } from "react";
import {
  ListGroup,
  Button,
  Spinner,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import axios from "axios";

function Notifikasi() {
  const [notifications, setNotifications] = useState([]);
  const [services, setServices] = useState([]); // Menyimpan daftar service
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    const brandId = localStorage.getItem("brand_id");

    if (!brandId) {
      console.error("Brand ID tidak ditemukan di localStorage");
      return;
    }

    // Fetch ongoing campaigns
    axios
      .get(
        `https://mesindigital.xyz/influence-be/get_campaigns.php?brand_id=${brandId}`
      )
      .then((response) => {
        setCampaigns(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the ongoing campaigns!",
          error
        );
        setLoading(false);
      });

    // Fetch notifications based on brand_id
    axios
      .get(
        `https://mesindigital.xyz/influence-be/brand/notifications.php?brand_id=${brandId}`
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the notifications!", error);
      });

    // Fetch list of services
    axios
      .get(`https://mesindigital.xyz/influence-be/SetService.php`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, []);

  // Handle showing the payment modal
  const handleShowPaymentModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowPaymentModal(true);
  };

  // Handle closing the payment modal
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  // Function to trigger payment
  const handlePayment = (campaign) => {
    const paymentData = {
      campaign_id: campaign.id,
      service_id: campaign.service_id,
      influencer_id: campaign.influencer_id,
      brand_id: localStorage.getItem("brand_id"),
    };

    console.log("Mengirim data ke backend untuk pembayaran:", paymentData);

    // Trigger payment action, e.g., open payment URL or trigger API
    axios
      .post(
        "https://mesindigital.xyz/influence-be/midtrans/payment.php",
        paymentData
      )
      .then((response) => {
        if (response.data.order_id && response.data.payment_url) {
          window.open(response.data.payment_url, "_blank");
        } else {
          alert("Failed to get payment URL");
        }
      })
      .catch((error) => {
        console.error("Error processing payment", error);
      });
  };

  // Function to get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return { color: "green" };
      case "rejected":
        return { color: "red" };
      case "pending":
        return { color: "orange" };
      case "Completed":
        return { color: "black" };
      default:
        return {};
    }
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
                    <Card.Text style={getStatusStyle(campaign.status)}>
                      Status: {campaign.status}
                    </Card.Text>
                    {/* Show "Bayar" button only if status is "approved" */}
                    {campaign.status === "approved" && (
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
              >
                Bayar Sekarang
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Notifikasi;
