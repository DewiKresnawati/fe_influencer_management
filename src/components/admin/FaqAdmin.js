import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function FaqAdmin() {
  const [faqData, setFaqData] = useState({ influencer: [], brand: [] });
  const [selectedCategory, setSelectedCategory] = useState('influencer');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    fetchFaqs();
  }, [selectedCategory]);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`http://localhost/star-1/backend/faq.php?category=${selectedCategory}`);
      setFaqData((prevData) => ({ ...prevData, [selectedCategory]: response.data }));
    } catch (error) {
      console.error("There was an error fetching the FAQs!", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddFaq = async () => {
    try {
      const newFaq = { category: selectedCategory, question: newQuestion, answer: newAnswer };
      await axios.post('http://localhost/star-1/backend/faq.php', newFaq);
      fetchFaqs();
      setNewQuestion('');
      setNewAnswer('');
    } catch (error) {
      console.error("There was an error adding the FAQ!", error);
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      await axios.delete('http://localhost/star-1/backend/faq.php', { data: { id } });
      fetchFaqs();
    } catch (error) {
      console.error("There was an error deleting the FAQ!", error);
    }
  };

  return (
    <Container style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      <Row>
        <Col md={4}>
          <Button
            variant={selectedCategory === 'influencer' ? 'primary' : 'outline-primary'}
            onClick={() => handleCategoryChange('influencer')}
            style={{ width: '100%', marginBottom: '10px' }}
          >
            Influencer
          </Button>
          <Button
            variant={selectedCategory === 'brand' ? 'primary' : 'outline-primary'}
            onClick={() => handleCategoryChange('brand')}
            style={{ width: '100%', marginBottom: '10px' }}
          >
            Brand
          </Button>
        </Col>
        <Col md={8}>
          <h3>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} FAQs</h3>
          {faqData[selectedCategory].map((faq, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Q:</strong> {faq.question}
                  <br />
                  <strong>A:</strong> {faq.answer}
                </div>
                <Button variant="danger" onClick={() => handleDeleteFaq(faq.id)}>Delete</Button>
              </div>
            </div>
          ))}
          <Form>
            <Form.Group controlId="formQuestion">
              <Form.Label>New Question</Form.Label>
              <Form.Control
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter new question"
              />
            </Form.Group>
            <Form.Group controlId="formAnswer" className="mt-3">
              <Form.Label>New Answer</Form.Label>
              <Form.Control
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Enter new answer"
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleAddFaq}>Add FAQ</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FaqAdmin;