import React from 'react';
import NavigationBar from '../components/landing/influencer/Navbar';
import HeroNews from '../components/landing/news/HeroNews';
import Artikel from '../components/landing/news/Artikel';
import DiscountSection from '../components/landing/DiscountSection';
import Footer from '../components/landing/Footer';

function NewsPage() {
  return (
    <div>
      <NavigationBar />
      <HeroNews />
      <Artikel />
      <DiscountSection />
      <Footer />
    </div>
  );
}

export default NewsPage;