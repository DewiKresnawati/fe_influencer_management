import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Artikel() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost/star-1/backend/artikel.php');
        setArticles(response.data);
      } catch (error) {
        console.error("There was an error fetching the articles!", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container>
      <Row>
        {articles.map((article) => (
          <Col key={article.id} md={4} className="mb-4">
            <Card style={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Card.Img variant="top" src={article.image} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.excerpt}</Card.Text>
                <Link to={`/lp-news/${article.id}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Artikel;