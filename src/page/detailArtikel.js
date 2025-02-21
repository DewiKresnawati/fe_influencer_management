import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import NavigationBar from "../components/landing/Navbar";

function ArtikelDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://mesindigital.xyz/influence-be/artikel.php?id=${id}`
        );
        setArticle(response.data);
      } catch (error) {
        setError("Gagal mengambil data artikel");
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <NavigationBar />
      <Container className="mt-4">
        <Card className="p-4">
          <Card.Img variant="top" src={article.image} alt={article.title} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>
              <small className="text-muted">{article.date}</small>
            </Card.Text>
            <Card.Text>{article.content}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ArtikelDetail;
