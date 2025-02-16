import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavbarAdmin from '../../components/admin/navbaradmin';
import Sidebar from '../../components/admin/Sidebar';
import Home from '../../components/admin/Home';
import Influencer from '../../components/admin/Influencer';
import Brand from '../../components/admin/Brand';
import StartVip from '../../components/admin/StartVip';
import Articles from '../../components/admin/Articles';
import FaqAdmin from '../../components/admin/FaqAdmin';
import BankAccount from '../../components/admin/BankAccount';
import ErrorBoundary from '../../components/ErrorBoundary';
// Import other components as needed

function DashboardAdmin() {
  const location = useLocation();

  const contentStyle = {
    marginLeft: '250px', // Adjust for the sidebar width
    padding: '20px',
    paddingTop: '100px',
  };

  const welcomeMessageStyle = {
    fontSize: '2rem',
    color: '#FFC300',
    textAlign: 'center',
    marginBottom: '20px',
    animation: 'fadeIn 1s ease-in-out',
  };

  const illustrationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const illustrationStyle = {
    position: 'relative',
    width: '100px',
    height: '100px',
    backgroundColor: '#FFC300',
    borderRadius: '50%',
    animation: 'fadeIn 1s ease-in-out',
  };

  const illustrationBeforeStyle = {
    content: '""',
    position: 'absolute',
    top: '10px',
    left: '50%',
    width: '60px',
    height: '60px',
    backgroundColor: '#001D3D',
    borderRadius: '50%',
    transform: 'translateX(-50%)',
  };

  const illustrationAfterStyle = {
    content: '""',
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    width: '80px',
    height: '40px',
    backgroundColor: '#001D3D',
    borderRadius: '20px 20px 0 0',
    transform: 'translateX(-50%)',
  };

  const keyframesStyle = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <ErrorBoundary>
      <div>
        <style>{keyframesStyle}</style>
        <NavbarAdmin />
        <Sidebar />
        <div style={contentStyle}>
          {location.pathname === '/admin/dashboard' && (
            <>
              <h1 style={welcomeMessageStyle}>Selamat datang di halaman admin</h1>
              <div style={illustrationContainerStyle}>
                <div style={illustrationStyle}>
                  <div style={illustrationBeforeStyle}></div>
                  <div style={illustrationAfterStyle}></div>
                </div>
              </div>
            </>
          )}
          <Routes>
            <Route path="transaksi" element={<Home />} />
            <Route path="influencers" element={<Influencer />} />
            <Route path="brands" element={<Brand />} />
            <Route path="vip" element={<StartVip />} />
            <Route path="articles" element={<Articles />} />
            <Route path="faq" element={<FaqAdmin />} />
            <Route path="bank-account" element={<BankAccount />} /> {/* Add route for BankAccount */}
            {/* Add routes for other components */}
          </Routes>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default DashboardAdmin;