import React from 'react';

function HeroNews() {
  const heroStyle = {
    height: '60vh',
    backgroundImage: 'url("./landing/news/hero-news.png")',
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
      <h2 style={textStyle}>News</h2>
    </section>
  );
}

export default HeroNews;