import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Image,
} from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";

const VipSect = () => {
  const [influencers, setInfluencers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("https://mesindigital.xyz/influence-be/influencerProfile.php") // Ganti dengan API yang benar
      .then((response) => response.json())
      .then((data) => {
        const filteredInfluencers = data.filter((influencer) => {
          const followersCount = parseInt(influencer.followers_count, 10) || 0;
          return followersCount > 10000;
        });
        setInfluencers(filteredInfluencers);
      })
      .catch((error) => console.error("Error fetching influencers:", error));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (influencer) => {
    setSelectedInfluencer(influencer);
    setShow(true);
  };

  const handleShowAll = () => setShowAll(true);
  const handleCloseAll = () => setShowAll(false);

  return (
    <section
      style={{
        background: "linear-gradient(to bottom, #FFC300, #0D1B2A)",
        padding: "50px 0",
        textAlign: "center",
        color: "white",
        paddingTop: "200px",
      }}
    >
      <Container>
        <h3 style={{ fontWeight: "bold", fontSize: "40px" }} className="mb-4">
          Influencers VIP
        </h3>
        <Button
          style={{
            backgroundColor: "#002855",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "12px",
          }}
          className="mb-5"
        >
          Influencer
        </Button>
        <Row>
          {influencers.slice(0, 3).map((influencer) => (
            <Col md={4} key={influencer.id}>
              <Card
                className="mb-4"
                style={{ backgroundColor: "white", borderRadius: "12px" }}
              >
                <Card.Img
                  variant="top"
                  src={influencer.profile_picture || "/default-image.jpg"}
                  alt={influencer.full_name}
                  className="p-3 custom-border-radius"
                />
                <Card.Body>
                  <h5 className="text-dark" style={{ fontSize: "1rem" }}>
                    {influencer.full_name}
                  </h5>
                  <p className="text-dark" style={{ fontSize: "0.8rem" }}>
                    {influencer.followers_count} Followers
                  </p>
                  <Button
                    className="btn btn-book-now"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => handleShow(influencer)}
                  >
                    Show Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Button variant="outline-light" onClick={handleShowAll}>
          Lihat Semua Influencer
        </Button>
      </Container>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Influencer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInfluencer && (
            <Container
              fluid
              className="p-4"
              style={{ backgroundColor: "#0D1B2A", color: "#ffffff" }}
            >
              <Row>
                <Col md={5} className="text-center">
                  <Image
                    src={
                      selectedInfluencer.profile_picture || "/default-image.jpg"
                    }
                    className="mb-3 custom-image"
                  />
                </Col>
                <Col md={7}>
                  <h5>{selectedInfluencer.full_name}</h5>
                  <p>Followers: {selectedInfluencer.followers_count}</p>
                  <p>Jenis Kelamin: {selectedInfluencer.gender}</p>
                  <p>Kategori: {selectedInfluencer.influencer_category}</p>
                  <p>Number Telephone: {selectedInfluencer.phone_number}</p>
                  <p>Provinsi: {selectedInfluencer.province}</p>
                  <p>Kota: {selectedInfluencer.city}</p>
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

      <Modal show={showAll} onHide={handleCloseAll} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>All Influencers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            fluid
            className="p-4"
            style={{
              backgroundColor: "#0D1B2A",
              color: "#ffffff",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Row>
              {influencers.map((influencer) => (
                <Col md={4} key={influencer.id}>
                  <Card
                    className="mb-4"
                    style={{ backgroundColor: "white", borderRadius: "12px" }}
                  >
                    <Card.Img
                      variant="top"
                      src={influencer.profile_picture || "/default-image.jpg"}
                      alt={influencer.full_name}
                      className="p-3 custom-border-radius"
                    />
                    <Card.Body>
                      <h5 className="text-dark" style={{ fontSize: "1rem" }}>
                        {influencer.full_name}
                      </h5>
                      <p className="text-dark" style={{ fontSize: "0.8rem" }}>
                        {influencer.followers_count} Followers
                      </p>
                      <Button
                        className="btn btn-book-now"
                        style={{ fontSize: "0.8rem" }}
                        onClick={() => handleShow(influencer)}
                      >
                        Show Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAll}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default VipSect;
