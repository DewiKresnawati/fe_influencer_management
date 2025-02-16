import React from 'react';

function HeroFaq() {
  const heroStyle = {
    height: '60vh',
    backgroundImage: 'url("./landing/faq/hero-faq.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: '3rem',
  };

  return (
    <section style={heroStyle}>
      <h2 style={textStyle}>FAQ</h2>
    </section>
  );
}

export default HeroFaq;