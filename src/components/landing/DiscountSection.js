import React from "react";
import "../css/DiscountSection.css"; // Pastikan untuk mengimpor file CSS

function DiscountSection() {
  return (
    <section className="discount-section py-5 align-items-center d-flex justify-content-center">
      <div className="container text-center text-white" style={{ backgroundImage: `url(landing/bg-bawah.png)`}}>
      <div className="container2">
        <h2 className="text-dark">Don’t Miss The 50% Discount if You Register Today</h2>
        <a href="/">
        <button  className="btn btn-dark mt-3">Register Today</button>
        </a>
      </div>
      </div>
    </section>
  );
}

export default DiscountSection;