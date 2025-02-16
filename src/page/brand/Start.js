import React from 'react';
import StartBrandLogin from '../../components/brand/Landing';
import InfluencerNavigationBar from '../../components/influencer/Navbar';

function StartPage() {
  return (
    <>
      <InfluencerNavigationBar />
      <StartBrandLogin />
    </>
  );
}

export default StartPage;