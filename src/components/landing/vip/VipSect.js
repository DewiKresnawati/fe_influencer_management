import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Image } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';

const influencers = [
  {
    id: 1,
    name: "@vip_influencer1",
    type: "VIP",
    platform: "Instagram",
    followers: "10K Followers",
    image: "landing/influencer/art1.png",
  },
  {
    id: 2,
    name: "@vip_influencer2",
    type: "VIP",
    platform: "Instagram",
    followers: "12K Followers",
    image: "landing/influencer/art2.png",
  },
  {
    id: 3,
    name: "@vip_influencer3",
    type: "VIP",
    platform: "Instagram",
    followers: "15K Followers",
    image: "landing/influencer/art3.png",
  },
  {
    id: 4,
    name: "@vip_influencer4",
    type: "VIP",
    platform: "Instagram",
    followers: "18K Followers",
    image: "landing/influencer/art4.png",
  },
  {
    id: 5,
    name: "@vip_influencer5",
    type: "VIP",
    platform: "Instagram",
    followers: "20K Followers",
    image: "landing/influencer/art5.png",
  },
  {
    id: 6,
    name: "@vip_influencer6",
    type: "VIP",
    platform: "Instagram",
    followers: "22K Followers",
    image: "landing/influencer/art6.png",
  },
];

function VipSect() {
  const [show, setShow] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (influencer) => {
    setSelectedInfluencer(influencer);
    setShow(true);
  };

  const handleShowAll = () => setShowAll(true);
  const handleCloseAll = () => setShowAll(false);

  const sectionStyle = {
    background: 'linear-gradient(to bottom, #FFC300, #0D1B2A)',
    padding: '50px 0',
    textAlign: 'center',
    color: 'white',
    paddingTop: '200px',
  };

  const modalStyle = {
    maxWidth: '95%',
    margin: 'auto',
  };

  const bold = {
    fontWeight: 'bold',
    fontSize: '40px'
  };

  const bg = {
    backgroundColor: ' #002855',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '12px',
  };

  return (
    <section style={sectionStyle}>
      <Container>
        <h3 style={bold} className="mb-4">Influencers VIP</h3>
        <Button style={bg} className="mb-5 ">Influencer</Button>
        <Row>
          {influencers.slice(0, 3).map((influencer) => (
            <Col md={4} key={influencer.id}>
              <Card className="mb-4" style={{ backgroundColor: 'white', borderRadius: '12px' }}>
                <Card.Img variant="top" src={influencer.image} alt={influencer.name} className="p-3 custom-border-radius" />
                <Card.Body>
                  <div className="row text-start px-4">
                    <div className="col-12 d-flex align-items-center">
                      <p className="content-type jenis text-light" style={{ fontSize: '0.8rem' }}>{influencer.type}</p>
                      <br className="mx-1" />
                      <p className="content-type medsos mx-2 text-dark" style={{ fontSize: '0.8rem' }}>{influencer.platform}</p>
                    </div>
                    <div className="col-12">
                      <h5 className="creator-name text-dark" style={{ fontSize: '1rem' }}>{influencer.name}</h5>
                    </div>
                    <div className="col-12">
                      <p className="platform-name text-dark" style={{ fontSize: '0.8rem' }}>{influencer.platform}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-dark" style={{ fontSize: '0.8rem' }}>{influencer.followers}</p>
                    </div>
                    <div className="col-6">
                      <Button className="btn btn-book-now" style={{ fontSize: '0.8rem' }} onClick={() => handleShow(influencer)}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Button variant="outline-light" onClick={handleShowAll}>Lihat Semua Influencer</Button>
      </Container>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Influencer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalStyle}>
          {selectedInfluencer && (
            <Container fluid className="p-4" style={{ backgroundColor: '#0D1B2A', color: '#ffffff' }}>
              <Row>
                <Col md={5} className="text-center">
                  <Image src={selectedInfluencer.image} className="mb-3 custom-image" />
                </Col>
                <Col md={7}>
                  <Row className="mb-3">
                    <Col>
                      <FaInstagram style={{ width: '30px', height: '30px' }} />
                      <h5 className="d-inline-block ms-2">{selectedInfluencer.name}</h5>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <p>Jenis Kelamin: Pria</p>
                      <p>Asal Kota: Bandung</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={3}>
                      <h6>Followers</h6>
                      <p className="text-warning">{selectedInfluencer.followers}</p>
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
                      <p>Entertainment</p>
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

      <Modal show={showAll} onHide={handleCloseAll} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>All Influencers</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalStyle}>
          <Container fluid className="p-4" style={{ backgroundColor: '#0D1B2A', color: '#ffffff', maxHeight: '80vh', overflowY: 'auto' }}>
            <Row>
              {influencers.map((influencer) => (
                <Col md={4} key={influencer.id}>
                  <Card className="mb-4" style={{ backgroundColor: 'white', borderRadius: '12px' }}>
                    <Card.Img variant="top" src={influencer.image} alt={influencer.name} className="p-3 custom-border-radius" />
                    <Card.Body>
                      <div className="row text-start px-4">
                        <div className="col-12 d-flex align-items-center">
                          <p className="content-type jenis text-light" style={{ fontSize: '0.7rem' }}>{influencer.type}</p>
                          <br className="mx-1" />
                          <p className="content-type medsos mx-2 text-dark" style={{ fontSize: '0.7rem' }}>{influencer.platform}</p>
                        </div>
                        <div className="col-12">
                          <h5 className="creator-name text-dark" style={{ fontSize: '0.9rem' }}>{influencer.name}</h5>
                        </div>
                        <div className="col-12">
                          <p className="platform-name text-dark" style={{ fontSize: '0.7rem' }}>{influencer.platform}</p>
                        </div>
                        <div className="col-6">
                          <p className="text-dark" style={{ fontSize: '0.7rem' }}>{influencer.followers}</p>
                        </div>
                        <div className="col-6">
                          <Button style={{ fontSize: '0.7rem' }} className="btn btn-book-now" onClick={() => handleShow(influencer)}>
                            Book Now
                          </Button>
                        </div>
                      </div>
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
}

export default VipSect;