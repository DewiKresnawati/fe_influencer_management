import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

function FaqSect() {
  const [faqData, setFaqData] = useState({ influencer: [], brand: [] });
  const [selectedCategory, setSelectedCategory] = useState('influencer');
  const [activeIndex, setActiveIndex] = useState(null);

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
    setActiveIndex(null); // Reset active index when category changes
  };

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const buttonStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#FFC300' : 'transparent',
    color: isSelected ? '#001D3D' : '#FFC300',
    fontWeight: 'bold',
    borderColor: '#FFC300',
    width: '100%',
    marginBottom: '10px',
  });

  const buttonHoverStyle = {
    backgroundColor: '#FFC300',
    color: '#001D3D',
  };

  return (
    <section style={{ padding: '50px 0', backgroundColor: '#001D3D' }}>
      <Container>
        <Row>
          <Col md={4}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button
                variant="outline-warning"
                onClick={() => handleCategoryChange('influencer')}
                style={buttonStyle(selectedCategory === 'influencer')}
                onMouseEnter={(e) => (e.target.style = buttonHoverStyle)}
                onMouseLeave={(e) => (e.target.style = buttonStyle(selectedCategory === 'influencer'))}
              >
                Influencer
              </Button>
              <Button
                variant="outline-warning"
                onClick={() => handleCategoryChange('brand')}
                style={buttonStyle(selectedCategory === 'brand')}
                onMouseEnter={(e) => (e.target.style = buttonHoverStyle)}
                onMouseLeave={(e) => (e.target.style = buttonStyle(selectedCategory === 'brand'))}
              >
                Brand
              </Button>
            </div>
          </Col>
          <Col md={8} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            <h3 style={{ color: '#001D3D', fontWeight: 'bold' }}>
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h3>
            {faqData[selectedCategory].map((faq, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div
                  onClick={() => toggleAnswer(index)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    color: '#001D3D',
                    padding: '10px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    border: '1px solid #FFC300',
                  }}
                >
                  {faq.question}
                </div>
                {activeIndex === index && (
                  <div
                    style={{
                      backgroundColor: 'white',
                      color: '#001D3D',
                      padding: '10px',
                      border: '1px solid #FFC300',
                      borderRadius: '5px',
                      marginTop: '5px',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default FaqSect;