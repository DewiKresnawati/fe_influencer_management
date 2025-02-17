import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Card,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import axios from "axios";

function Marketplace() {
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [proposalDeadline, setProposalDeadline] = useState("");
  const [brief, setBrief] = useState("");
  const [showOngoing, setShowOngoing] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
  const [campaignHistory, setCampaignHistory] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://mesindigital.xyz/influence-be/brand/marketplace.php?action=services"
      )
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
    // Fetch influencers from API
    axios
      .get("https://mesindigital.xyz/influence-be/influencerProfile.php")
      .then((response) => {
        setInfluencers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the influencers!", error);
      });

    // Fetch ongoing campaigns from API
    axios
      .get(
        "https://mesindigital.xyz/influence-be/brand/marketplace.php?action=ongoing_campaigns"
      )
      .then((response) => {
        setOngoingCampaigns(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the ongoing campaigns!",
          error
        );
      });

    axios
      .get(
        "https://mesindigital.xyz/influence-be/brand/marketplace.php?action=campaign_history"
      )
      .then((response) => {
        console.log("Response Data:", response.data); // Debugging
        setCampaignHistory(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the campaign history!",
          error
        );
      });
  }, []);

  const loggedInBrandId = localStorage.getItem("brand_id");
  console.log("loggedInBrandId:", loggedInBrandId);

  const filteredCampaigns = campaignHistory.filter(
    (campaign) =>
      campaign.status === "Completed" && campaign.brand_id === loggedInBrandId
  );
  console.log("Filtered Campaigns:", filteredCampaigns);

  const handleCreateCampaign = () => {
    setStep(2);
  };

  const handleSelectInfluencer = (influencer) => {
    setSelectedInfluencers((prev) => {
      if (prev.find((inf) => inf.id === influencer.id)) {
        return prev; // Hindari duplikasi
      }
      return [...prev, influencer];
    });
  };

  const handleSelectService = (selectedService) => {
    setService(selectedService);
    console.log("Service selected:", selectedService);
  };
  const filteredInfluencers = influencers
    .map((influencer) => {
      const matchedService = services.find(
        (serviceItem) =>
          serviceItem.service_name === service &&
          serviceItem.influencer_id === influencer.id
      );

      return matchedService
        ? { ...influencer, serviceDetails: matchedService }
        : null;
    })
    .filter(Boolean);

  const handleSaveChanges = () => {
    const serviceId = services.find(
      (serv) => serv.service_name === service
    )?.id;
    const influencerData = filteredInfluencers.find(
      (influencer) => influencer.serviceDetails.service_name === service
    );
    const influencerId = influencerData?.id;

    if (!serviceId) {
      console.error("Service not found!");
      return;
    }

    const brandId = localStorage.getItem("brand_id"); // Ambil brand_id dari localStorage
    if (!brandId) {
      console.error("Brand ID not found in localStorage!");
      return;
    }

    if (!influencerId) {
      console.error("Influencer ID not found in service data!");
      return;
    }

    // Data untuk membuat pembayaran di database
    const paymentData = {
      brand_id: brandId,
      service_id: serviceId,
      influencer_id: influencerId,
    };

    console.log(
      "Mengirim data ke backend untuk membuat pembayaran:",
      paymentData
    );

    // Step 1: Simpan data pembayaran ke database
    axios
      .post(
        "https://mesindigital.xyz/influence-be/midtrans/payment.php",
        paymentData
      )
      .then((response) => {
        console.log("Response dari backend:", response.data);
        if (response.data.order_id && response.data.payment_url) {
          const paymentUrl = response.data.payment_url;

          // ✅ Langsung buka halaman pembayaran di popup/tab baru
          window.open(paymentUrl, "_blank");

          return; // Tidak perlu request kedua jika sudah dapat payment_url
        } else {
          throw new Error("Gagal mendapatkan payment URL dari backend!");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat memproses pembayaran!", error);
      });
  };

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    alert("Pembayaran berhasil. Kampanye dibuat.");
    // Logika tambahan setelah pembayaran berhasil
  };

  // Simulasi persetujuan influencer setelah 3 detik
  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        setStep(6); // Set step to 6 to show the payment page
      }, 3000); // 3 detik

      return () => clearTimeout(timer);
    }
  }, [step]);

  const containerStyle = {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  };

  const contentStyle = {
    backgroundColor: "#FFC300",
    color: "#001D3D",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "1000px",
    position: "relative",
    marginTop: "60px",
    marginLeft: "15px", // Menyesuaikan margin untuk memindahkan konten ke kiri
  };

  const adminAccountNumber = "9876543210"; // Nomor rekening yang diatur oleh admin

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {step === 1 && (
          <>
            <h2 className="text-center mb-4" style={{ color: "#001D3D" }}>
              Kampanye
            </h2>
            <Row>
              <Col>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowOngoing(true)}
                >
                  Kampanye Berlangsung
                </h3>
                {showOngoing &&
                  ongoingCampaigns.map((campaign) => (
                    <Card key={campaign.id} style={{ margin: "10px 0" }}>
                      <Card.Body>
                        <Card.Title>{campaign.name}</Card.Title>
                        <Card.Text>Status: {campaign.status}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
              </Col>
              <Col>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowOngoing(false)}
                >
                  Riwayat Kampanye
                </h3>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td>{campaign.id}</td>
                      <td>{campaign.name}</td>
                      <td>{campaign.start_date}</td>
                      <td>{campaign.end_date}</td>
                      <td>{campaign.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </Col>
            </Row>
            <Button onClick={handleCreateCampaign}>Buat Kampanye</Button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-center mb-4" style={{ color: "#001D3D" }}>
              Buat Kampanye
            </h2>
            <Form>
              <Form.Group controlId="campaignName">
                <Form.Label>Nama Kampanye</Form.Label>
                <Form.Control
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="service">
                <Form.Label>Layanan</Form.Label>
                <DropdownButton
                  title={service || "Pilih Services"}
                  onSelect={handleSelectService}
                >
                  {services.map((serv) => (
                    <Dropdown.Item key={serv.id} eventKey={serv.service_name}>
                      {serv.service_name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Form.Group>
              <Button onClick={() => setStep(3)}>Lanjut</Button>
            </Form>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-center mb-4" style={{ color: "#001D3D" }}>
              Pilih Influencer
            </h2>

            {influencers.length === 0 ? (
              <p className="text-center">
                Tidak ada influencer yang tersedia untuk kategori ini.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {filteredInfluencers.map((influencer) => (
                  <Card
                    key={influencer.id}
                    className="mb-4"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      width: "18rem",
                      margin: "10px",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={`https://mesindigital.xyz/influence-be/${influencer.profile_picture}`}
                      alt={influencer.full_name}
                      className="p-3 custom-border-radius"
                    />
                    <Card.Body>
                      <div className="row text-start px-4">
                        <div className="col-12">
                          <h5 className="creator-name text-dark">
                            {influencer.full_name}
                          </h5>
                        </div>
                        <div className="col-12">
                          <p className="text-dark">
                            {influencer.serviceDetails.service_name}
                          </p>
                        </div>
                        <div className="col-12 d-flex align-items-center">
                          <p className="content-type medsos mx-2 text-dark">
                            Rp {influencer.serviceDetails.price_per_post}
                          </p>
                        </div>
                        <div className="col-12 d-flex align-items-center">
                          <p className="content-type medsos mx-2 text-dark">
                            Durasi {influencer.serviceDetails.duration}
                          </p>
                        </div>
                        <div className="col-12">
                          <p className="text-dark">
                            {influencer.serviceDetails.description}
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-dark">
                            {influencer.followers_count} Followers
                          </p>
                        </div>
                        <div className="col-6">
                          <Button
                            className="btn btn-book-now"
                            onClick={() => handleSelectInfluencer(influencer)}
                          >
                            Pilih
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}

            {selectedInfluencers.length > 0 && (
              <div className="text-center mt-4">
                <Button onClick={() => setStep(4)}>Lanjut</Button>
              </div>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-center mb-4" style={{ color: "#001D3D" }}>
              Unggah Brief
            </h2>
            <Form>
              <Form.Group controlId="startDate">
                <Form.Label>Tanggal Mulai</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="endDate">
                <Form.Label>Tanggal Selesai</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="proposalDeadline">
                <Form.Label>Batas Waktu Proposal</Form.Label>
                <Form.Control
                  type="date"
                  value={proposalDeadline}
                  onChange={(e) => setProposalDeadline(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="brief">
                <Form.Label>Brief</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                />
              </Form.Group>
              <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
            </Form>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-center mb-4" style={{ color: "#001D3D" }}>
              Menunggu Persetujuan Influencer
            </h2>
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <p>Menunggu persetujuan dari influencer...</p>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-center mb-4" style={{ color: "#001D3D" }}>
              Pembayaran
            </h2>
            <p>
              Silakan lanjutkan pembayaran untuk menyelesaikan pembuatan
              kampanye.
            </p>
            <Button onClick={handlePayment}>Bayar</Button>
          </>
        )}

        <Modal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Gateway Pembayaran</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="brandName">
                <Form.Label>Nama Brand</Form.Label>
                <Form.Control type="text" value="Nama Brand" readOnly />
              </Form.Group>
              <Form.Group controlId="influencerName">
                <Form.Label>Nama Influencer</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedInfluencers
                    .map((influencer) => influencer.full_name)
                    .join(", ")}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedInfluencers
                    .map((influencer) => influencer.price)
                    .join(", ")}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="accountNumber">
                <Form.Label>Nomor Rekening</Form.Label>
                <Form.Control type="text" value={adminAccountNumber} readOnly />
              </Form.Group>
              <Button variant="success" onClick={handlePaymentSuccess}>
                Bayar Sekarang
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Marketplace;
