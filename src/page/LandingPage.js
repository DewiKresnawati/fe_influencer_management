import React from "react";
import NavigationBar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import Review from "../components/landing/Review";
import StarpowersVIP from "../components/landing/StarpowersVIP";
import AboutStarpowers from "../components/landing/AboutStarpowers";
import WhyStarpowers from "../components/landing/WhyStarpowers";
import DiscountSection from "../components/landing/DiscountSection";
import Footer from "../components/landing/Footer";

function LandingPage() {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <Review className="landing-page-review" />
      <StarpowersVIP />
      <AboutStarpowers />
      <WhyStarpowers />
      <DiscountSection />
      <Footer />
    </>
  );
}

export default LandingPage;