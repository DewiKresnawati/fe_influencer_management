import React from "react";
import { Link } from "react-router-dom";
import "../css/HeroSection.css"; // Pastikan Anda membuat file CSS terpisah

function HeroSection() {
  return (
    <section className="hero-section text-start">
      <div className="container text-start hero">
        <div className="hero-content d-flex align-items-center mb-5">
          <div className="hero-text flex-grow-1">
            <h1 className="hero-title">
              Elevate Your Brand<br />Expand Your Influence
            </h1>
            <p className="hero-description text-start">
              Starpowers, menghubungkan merek Anda dengan influencer yang tepat, mempromosikan 
              produk/jasa Anda dan memperluas jangkauan pasar, dari bisnis kecil hingga besar.
            </p>
          </div>
          <img src="influencer/Logo.png" alt="Logo" className="hero-logo" />
        </div>
        <div className="hero-search d-flex justify-content-between">
          <div className="hero-buttons d-flex">
            <Link to="/brand" className="btn btn-brand">
              Saya Pemilik Brand
            </Link>
            <Link to="/influencer/login" className="btn btn-influencer">
              Saya Seorang Influencer
            </Link>
          </div>
          <button className="btn btn-promo">PROMOSIKAN IKLAN BRAND KAMU DISINI</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;