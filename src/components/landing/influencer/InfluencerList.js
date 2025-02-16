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
import axios from "axios";

function InfluencerList({ filter }) {
  const [show, setShow] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/star-1/backend/signinfluencer.php"
      );
      setInfluencers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("There was an error fetching the influencers!", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (influencer) => {
    setSelectedInfluencer(influencer);
    setShow(true);
  };

  const renderHomeContent = () => (
    <div
      className="home-content"
      style={{ textAlign: "center", height: "50vh", margin: "0 10%" }}
    >
      <Container className="d-flex flex-column justify-content-center align-items-center h-100">
        <h2
          className="text-center text-dark mb-4"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          Tentang Influencer Marketing
        </h2>
        <Row>
          <Col md={6} className="mb-3">
            <h4
              className="text-dark text-start"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              Apa itu Influencer Marketing
            </h4>
            <p className="text-dark text-start">
              Influencer Marketing adalah strategi pemasaran yang dilakukan
              secara daring dengan melibatkan kolaborasi antara influencer dan
              perusahaan. Tujuan utamanya adalah untuk meningkatkan kesadaran
              merek dan kredibilitas produk, serta meningkatkan penjualan sesuai
              dengan target pasar yang ditentukan.
            </p>
          </Col>
          <Col md={6} className="mb-3">
            <h4
              className="text-dark text-start"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              Daftar Influencer Marketing
            </h4>
            <p className="text-dark text-start">
              Platform Starpowers sebagai penyedia layanan Influencer Marketing
              di Indonesia menawarkan beragam influencer dari berbagai bidang.
              Kami mengelompokkan influencer Indonesia ke dalam
              kategori-kategori seperti entertainment, sports & healthy,
              lifestyle/travel, technology/gadget, family & parenting, food and
              beverages, beauty and fashion, serta gaming.
            </p>
          </Col>
          <Col md={6} className="mb-3">
            <h4
              className="text-dark text-start"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              KOL Strategy
            </h4>
            <p className="text-dark text-start">
              Strategi Key Opinion Leader (KOL) merupakan salah satu pendekatan
              yang efektif dalam Influencer Marketing. Dengan memanfaatkan
              pengaruh influencer yang memiliki jumlah pengikut yang besar,
              diharapkan kesadaran merek dapat tersebar lebih luas.
            </p>
          </Col>
          <Col md={6} className="mb-3">
            <h4
              className="text-dark text-start"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              Influencer Indonesia
            </h4>
            <p className="text-dark text-start">
              Influencer kami tersebar di seluruh Indonesia, mencakup berbagai
              daerah dari kota besar seperti Jakarta, Bandung, Yogyakarta,
              Medan, Makassar, hingga wilayah seperti Bali, Mataram, dan banyak
              lagi. Dengan Starpowers, Anda dapat memilih influencer yang
              memiliki jangkauan pengikut sesuai dengan lokasi bisnis Anda.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );

  return (
    <section
      className={`influencer-list ${filter === "Home" ? "home-section" : ""}`}
      style={{
        backgroundColor: filter === "Home" ? "#FFC300" : "transparent",
        height: filter === "Home" ? "150vh" : "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="h-100 d-flex flex-column justify-content-center">
        {filter === "Home" ? (
          renderHomeContent()
        ) : (
          <>
            <h2 className="text-center pt-5 text-white mb-5">{filter}</h2>
            <Row className="pb-5">
              {influencers
                .filter(
                  (influencer) => influencer.influencer_category === filter
                )
                .map((influencer, index) => (
                  <Col md={4} key={index}>
                    <Card
                      className="mb-4"
                      style={{ backgroundColor: "white", borderRadius: "12px" }}
                    >
                      <Card.Img
                        variant="top"
                        src={`http://localhost/star-1/backend/${influencer.profile_picture}`}
                        alt={influencer.full_name}
                        className="p-3 custom-border-radius"
                      />
                      <Card.Body>
                        <div className="row text-start px-4">
                          <div className="col-12 d-flex align-items-center">
                            <p className="content-type jenis text-light">
                              {influencer.influencer_category}
                            </p>
                            <br className="mx-1" />
                            <p className="content-type medsos mx-2 text-dark">
                              {influencer.platform}
                            </p>
                          </div>
                          <div className="col-12">
                            <h5 className="creator-name text-dark">
                              {influencer.full_name}
                            </h5>
                          </div>
                          <div className="col-12">
                            <p className="platform-name text-dark">
                              {influencer.platform}
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
                              onClick={() => handleShow(influencer)}
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </>
        )}
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
                    src={`http://localhost/star-1/backend/${selectedInfluencer.profile_picture}`}
                    className="mb-3 custom-image"
                  />
                </Col>
                <Col md={7}>
                  <Row className="mb-3">
                    <Col>
                      <a
                        href={`https://www.instagram.com/${selectedInfluencer.instagram_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        <FaInstagram
                          style={{ width: "30px", height: "30px" }}
                        />
                        <h5 className="d-inline-block ms-2">
                          {selectedInfluencer.full_name}
                        </h5>
                      </a>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <p>Jenis Kelamin: {selectedInfluencer.gender}</p>
                      <p>Asal Kota: {selectedInfluencer.city}</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={3}>
                      <h6>Followers</h6>
                      <p className="text-warning">
                        {selectedInfluencer.followers_count}
                      </p>
                    </Col>
                    <Col md={3}>
                      <h6>Likes</h6>
                      <p className="text-warning">1000</p>
                    </Col>
                    <Col md={3}>
                      <h6>Comments</h6>
                      <p className="text-warning">100</p>
                    </Col>
                    <Col md={3}>
                      <h6>Engagement</h6>
                      <p className="text-warning">10%</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <h6>Service</h6>
                      <p>Instagram Story</p>
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
    </section>
  );
}

export default InfluencerList;
