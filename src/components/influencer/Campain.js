// filepath: /c:/laragon/www/star-1/starweb/src/components/influencer/Campain.js
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

function Campain() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]);
  const [completedCampaigns, setCompletedCampaigns] = useState([]);
  const [services, setServices] = useState([]);
  const [proofs, setProofs] = useState({});

  useEffect(() => {
    // Fetch campaigns from API
    axios
      .get(
        "http://localhost/star-1/backend/brand/marketplace.php?action=campaigns"
      )
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the campaigns!", error);
      });

    // Fetch approved campaigns from API
    axios
      .get("http://localhost/star-1/backend/approved_campaigns.php")
      .then((response) => {
        setApprovedCampaigns(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the approved campaigns!",
          error
        );
      });

    axios.get("http://localhost/star-1/backend/fetch_completed_campaigns.php")
      .then((response) => {
        if (response.data.success) {
          setCompletedCampaigns(response.data.data);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the completed campaigns!",
          error
        );
      });

    axios
      .get("http://localhost/star-1/backend/fetch_proof.php")
      .then((response) => {
        setProofs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching proofs:", error);
      });
    // Fetch services from API
    axios
      .get("http://localhost/star-1/backend/SetService.php")
      .then((response) => {
        setServices(response.data.services);
      })
      .catch((error) => {
        console.error("There was an error fetching the services!", error);
      });
  }, []);

  const handleFileChange = (e, campaignId) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("proof", file);
      formData.append("campaign_id", campaignId);

      axios
        .post("http://localhost/star-1/backend/upload_proof.php", formData)
        .then((response) => {
          if (response.data.success) {
            setProofs((prev) => ({
              ...prev,
              [campaignId]: response.data.fileUrl,
            }));
            alert("Bukti screenshot berhasil diunggah");
          } else {
            alert(response.data.error);
          }
        })
        .catch((error) => console.error("Error uploading proof:", error));
    }
  };

  const handleComplete = (campaignId) => {
    axios
      .post(
        "http://localhost/star-1/backend/complete_campaign.php",
        JSON.stringify({ campaign_id: campaignId }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.data.success) {
          setApprovedCampaigns((prev) =>
            prev.map((campaign) =>
              campaign.id === campaignId
                ? { ...campaign, status: "Completed" }
                : campaign
            )
          );
          alert("Kampanye telah selesai");
        }
      })
      .catch((error) => {
        console.error("Error completing campaign!", error);
      });
  };

  const handleApprove = (campaignId) => {
    axios
      .post("http://localhost/star-1/backend/brand/marketplace.php", {
        action: "approve",
        campaign_id: campaignId,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Kampanye berhasil diterima.");
          setCampaigns(
            campaigns.filter((campaign) => campaign.id !== campaignId)
          );
          setApprovedCampaigns([
            ...approvedCampaigns,
            campaigns.find((campaign) => campaign.id === campaignId),
          ]);
        } else {
          console.error(
            "There was an error approving the campaign!",
            response.data.error
          );
        }
      })
      .catch((error) => {
        console.error("There was an error approving the campaign!", error);
      });
  };

  const handleReject = (campaignId) => {
    axios
      .post("http://localhost/star-1/backend/brand/marketplace.php", {
        action: "reject",
        campaign_id: campaignId,
      })
      .then((response) => {
        if (response.data.success) {
          alert("Kampanye berhasil ditolak.");
          setCampaigns(
            campaigns.filter((campaign) => campaign.id !== campaignId)
          );
        } else {
          console.error(
            "There was an error rejecting the campaign!",
            response.data.error
          );
        }
      })
      .catch((error) => {
        console.error("There was an error rejecting the campaign!", error);
      });
  };

  const getServicePrice = (influencerId) => {
    const service = services.find(
      (service) => service.influencer_id === influencerId
    );
    return service ? service.price_per_post : "Harga tidak tersedia";
  };

  const containerStyle = {
    padding: "50px 0",
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
    marginLeft: "250px",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2 className="text-center mb-4">Proyek & Penawaran</h2>
        {campaigns.length === 0 ? (
          <p className="text-center">Tidak ada proyek yang tersedia.</p>
        ) : (
          campaigns.map((campaign) => (
            <Card key={campaign.id} className="mb-3">
              <Card.Body>
                <Card.Title>{campaign.name}</Card.Title>
                <Card.Text>{campaign.title}</Card.Text>
                {selectedCampaign === campaign.id ? (
                  <>
                    <Row>
                      <Col>
                        <strong>Tanggal Mulai:</strong>
                      </Col>
                      <Col>{campaign.start_date}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Tanggal Selesai:</strong>
                      </Col>
                      <Col>{campaign.end_date}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Batas Waktu Proposal:</strong>
                      </Col>
                      <Col>{campaign.proposal_deadline}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Harga:</strong>
                      </Col>
                      <Col>{getServicePrice(campaign.influencer_id)}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Brief:</strong>
                      </Col>
                      <Col>{campaign.brief}</Col>
                    </Row>
                    <div style={buttonGroupStyle}>
                      <Button
                        variant="success"
                        onClick={() => handleApprove(campaign.id)}
                      >
                        Terima
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleReject(campaign.id)}
                      >
                        Tolak
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button onClick={() => setSelectedCampaign(campaign.id)}>
                    Lihat Detail
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))
        )}
        <h2 className="text-center mb-4">Kampanye yang Disetujui</h2>
        {approvedCampaigns.length === 0 ? (
          <p className="text-center">Tidak ada kampanye yang disetujui.</p>
        ) : (
          approvedCampaigns.map((campaign) => (
            <Card key={campaign.id} className="mb-3">
              <Card.Body>
                <Card.Title>{campaign.name}</Card.Title>
                <Card.Text>{campaign.title}</Card.Text>
                <Row>
                  <Col>
                    <strong>Tanggal Mulai:</strong>
                  </Col>
                  <Col>{campaign.start_date}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Tanggal Selesai:</strong>
                  </Col>
                  <Col>{campaign.end_date}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Batas Waktu Proposal:</strong>
                  </Col>
                  <Col>{campaign.proposal_deadline}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Harga:</strong>
                  </Col>
                  <Col>{getServicePrice(campaign.influencer_id)}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Brief:</strong>
                  </Col>
                  <Col>{campaign.brief}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Bukti Post:</strong>
                  </Col>
                  <Col>
                    {proofs[campaign.id] ? (
                      <img
                        src={`http://localhost/star-1/backend/${
                          proofs[campaign.id]
                        }`}
                        alt="Bukti"
                        width="150"
                      />
                    ) : campaign.status === "Completed" ? (
                      <span>Tidak ada bukti yang diunggah</span>
                    ) : (
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, campaign.id)}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <strong>Status:</strong>
                  </Col>
                  <Col>{campaign.status || "In Progress"}</Col>
                </Row>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => handleComplete(campaign.id)}
                >
                  Selesai
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
        <h2 className="text-center mb-4">Kampanye yang Sudah Selesai</h2>
        {completedCampaigns.length === 0 ? (
          <p className="text-center">Tidak ada kampanye yang selesai.</p>
        ) : (
          completedCampaigns.map((campaign) => (
            <Card key={campaign.id} className="mb-3">
              <Card.Body>
                <Card.Title>{campaign.name}</Card.Title>
                <Row>
                  <Col>
                    <strong>Tanggal Mulai:</strong>
                  </Col>
                  <Col>{campaign.start_date}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Tanggal Selesai:</strong>
                  </Col>
                  <Col>{campaign.end_date}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Batas Waktu Proposal:</strong>
                  </Col>
                  <Col>{campaign.proposal_deadline}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Brief:</strong>
                  </Col>
                  <Col>{campaign.brief}</Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Campain;
