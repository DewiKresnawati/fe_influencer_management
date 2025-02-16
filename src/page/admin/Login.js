import React, { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import AdminFormLogin from '../../components/admin/AdminFormLogin';
import LoginSect from '../../components/admin/LoginSect';

function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  return (
    <>
    <Navbar />

      {!showLoginForm && <LoginSect onLoginClick={handleLoginClick} />}
      {showLoginForm && <AdminFormLogin />}
    </>
  );
}

export default Login;