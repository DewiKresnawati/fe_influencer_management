import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarLog from '../../components/influencer/NavbarLog';
import Sidebar from '../../components/influencer/Sidebar';
import Campain from '../../components/influencer/Campain';
import AkunInf from '../../components/influencer/AkunInf';
import ErrorBoundary from '../../components/ErrorBoundary';

function Dashboard() {
  return (
    <ErrorBoundary>
      <div>
        <NavbarLog />
        <Sidebar />
        <Routes>
          <Route path="campain" element={<Campain />} />
          <Route path="akun" element={<AkunInf />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default Dashboard;