import React from 'react';
import NavigationBar from '../components/landing/influencer/Navbar';
import HeroFaq from '../components/landing/faq/HeroFaq';
import FaqSect from '../components/landing/faq/FaqSect';
import DiscountSection from '../components/landing/DiscountSection';
import Footer from '../components/landing/Footer';

function Faq() {
  return (
    <div>
      <NavigationBar />
      <HeroFaq />
      <FaqSect />
      <DiscountSection />
      <Footer />
    </div>
  );
}

export default Faq;