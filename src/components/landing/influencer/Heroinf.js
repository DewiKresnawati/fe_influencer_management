import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "./Navbar";
import "../../css/influencer/Heroinf.css"; 

function Heroinf({ onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

return (
    <section className="hero-section" style={{ backgroundImage: 'url(landing/bg-heroinf.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <NavigationBar />
        <Container className="text-center pt-5">
            <h1 className="hero-title">Influencer Starpowers</h1>
            <p className="text-center penjelasan">Berikut daftar influencer Indonesia terbaik dari Starpowers  dengan berbagai platform untuk kebutuhan influencer marketing bisnis Anda</p>
            <div className="filter-buttons">
                <Row>
                    <Col md={3}>
                        <Button className="btn-filter" onClick={() => handleFilterClick("Entertainment")}>Entertainment</Button>
                    </Col>
                    <Col md={3}>
                        <Button className="btn-filter" onClick={() => handleFilterClick("Lifestyle and Travel")}>Lifestyle and Travel</Button>
                    </Col>
                    <Col md={3}>
                        <Button className="btn-filter" onClick={() => handleFilterClick("Family and Parenting")}>Family and Parenting</Button>
                    </Col>
                    <Col md={3}>
                        <Button className="btn-filter" onClick={() => handleFilterClick("Beauty and Fashion")}>Beauty and Fashion</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={3}>
                        <Button className="btn-filter" onClick={() => handleFilterClick("Health and Support")}>Health and Support</Button>
                    </Col>
                    <Col md={3}>
                        <Button className="btn-filter" onClick={() => handleFilterClick("Technology")}>Technology</Button>
                    </Col>
                    <Col md={3}>
                        <Button className="btn-filter" onClick={() => handleFilterClick("Food and Beverages")}>Food and Beverages</Button>
                    </Col>
                    <Col md={3}>
                        <Button className="btn-filter" onClick={() => handleFilterClick("Gaming")}>Gaming</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    </section>
);
}

export default Heroinf;