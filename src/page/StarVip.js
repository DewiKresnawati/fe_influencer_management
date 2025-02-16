import React from 'react';
import NavigationBar from '../components/landing/influencer/Navbar';
import HeroVip from '../components/landing/vip/HeroVip';
import VipSect from '../components/landing/vip/VipSect';
import Review from '../components/landing/Review';
import DiscountSection from '../components/landing/DiscountSection';
import Footer from '../components/landing/Footer';

function StarVip() {
  return (
    <div style={{ position: 'relative' }}>
      <NavigationBar />
      <HeroVip />
      <div style={{ position: 'absolute', top: '27%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <Review />
      </div>
      <VipSect />
      <DiscountSection />
      <Footer />
    </div>
  );
}

export default StarVip;