import React from 'react';

function HeroVip() {
  const heroStyle = {
    height: '100vh',
    backgroundImage: 'url("./landing/vip/hero-bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  };

  const textStyle = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  return (
    <section style={heroStyle}>
      <div style={textStyle}>
        <h2 style={{ fontWeight: 'bold', fontSize: '3rem' }}>Starpowers VIP</h2>
        <p style={{ fontSize: '1.25rem' }}>Starpowers VIP adalah seleksi influencer terpilih yang telah melewati serangkaian tahapan seleksi ketat oleh Starpowers Indonesia. Mereka adalah para ahli dalam mengelola konten yang sesuai dengan kategori masing-masing.</p>
      </div>
    </section>
  );
}

export default HeroVip;