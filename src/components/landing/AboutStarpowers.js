import React from "react";
import "../css/AboutStarpowers.css";

function AboutStarpowers() {
  return (
    <section className="about-starpowers py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src="landing/apaitu.png" alt="Starpowers" className="img-fluid" />
          </div>
          <div className="col-md-6 text-start d-flex flex-column justify-content-betwwn align-items-between tentang">
            <h2 className="text-light">Tentang Starpowers</h2>
            <h3 className="text-light">Apa Itu Starpowers</h3>
            <p className="text-light">
            Starpowers adalah platform influencer marketing terkemuka di Indonesia, dengan ribuan influencer dari beragam platform digital seperti Instagram, Facebook, Twitter, dan YouTube. Mereka mewakili berbagai industri, termasuk Travel, Fashion, F&B, Beauty, Mom & Parenting, 
            dan lainnya. Bersama kami, brand Anda siap untuk meningkatkan kesadaran dan keterlibatan di ranah digital.
            </p>
            <a href="/">
              <button className="btn btn-primary">Join Us</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStarpowers;