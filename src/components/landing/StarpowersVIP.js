import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Image } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "../css/StarpowersVIP.css";

function StarpowersVIP() {
  const [show, setShow] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const fetchInfluencers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/influencers/');
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

  return (
    <section className="starpowers-vip py-5">
      <div className="container">
        <h2 className="text-center text-white mb-4">Starpowers VIP</h2>
        <div className="row text-center pt-5">
          {Array.isArray(influencers) && influencers.map((influencer) => (
            <div className="col-md-4" key={influencer.id}>
              <div className="card mb-4" style={{ backgroundColor: 'white', borderRadius: '12px' }}>
                <img
                  src={`http://localhost/star-1/backend/${influencer.profile_picture}`}
                  alt="Influencer"
                  className="card-img-top p-3 custom-border-radius"
                />
                <div className="card-body">
                  <div className="row text-start px-4">
                    <div className="col-12 d-flex align-items-center">
                      <p className="content-type jenis">{influencer.influencer_category}</p>
                      <br className="mx-1" />
                      <p className="content-type medsos mx-2 text-dark">{influencer.platform}</p>
                    </div>
                    <div className="col-12">
                      <h5 className="creator-name text-dark">{influencer.full_name}</h5>
                    </div>
                    <div className="col-12">
                      <p className="platform-name text-dark">{influencer.platform}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-dark">{influencer.followers_count} Followers</p>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-book-now"
                        onClick={() => handleShow(influencer)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Influencer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInfluencer && (
            <Container fluid className="p-4" style={{ backgroundColor: '#0D1B2A', color: '#ffffff' }}>
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
                      <FaInstagram style={{ width: '30px', height: '30px' }} />
                      <h5 className="d-inline-block ms-2">{selectedInfluencer.full_name}</h5>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <p>Jenis Kelamin: {selectedInfluencer.gender}</p>
                      <p>Asal Kota: Bandung</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={3}>
                      <h6>Followers</h6>
                      <p className="text-warning">{selectedInfluencer.followers_count}</p>
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

export default StarpowersVIP;