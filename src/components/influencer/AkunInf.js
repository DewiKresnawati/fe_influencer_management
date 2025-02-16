import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import EditProfile from './inf/EditProfile';
import EditPassword from './inf/EditPassword';
import EditService from './inf/EditService';

function AkunInf() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '@entertainment_influencer1',
    type: 'Entertainment',
    platform: 'Instagram',
    followers: '5K Followers',
    image: 'landing/influencer/art1.png',
  });

  const handleLogout = () => {
    setShowLogoutAlert(false);
    window.location.href = '/';
  };

  const containerStyle = {
    padding: '50px 0',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const contentStyle = {
    backgroundColor: '#FFC300',
    color: '#001D3D',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1000px',
    position: 'relative',
    marginTop: '60px',
    marginLeft: '250px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '10px 0',
    backgroundColor: '#001D3D',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2 className="text-center mb-4" style={{ color: '#001D3D' }}>Edit Akun</h2>
        <div style={buttonContainerStyle}>
          <Button style={buttonStyle} onClick={() => setShowProfileModal(true)}>Edit Profile</Button>
          <Button style={buttonStyle} onClick={() => setShowPasswordModal(true)}>Ubah Password</Button>
          <Button style={buttonStyle} onClick={() => setShowServiceModal(true)}>Edit Service</Button>
          <Button style={buttonStyle} onClick={() => setShowLogoutAlert(true)}>Logout</Button>
        </div>

        <EditProfile
          show={showProfileModal}
          handleClose={() => setShowProfileModal(false)}
          profileData={profileData}
          setProfileData={setProfileData}
        />

        <EditPassword
          show={showPasswordModal}
          handleClose={() => setShowPasswordModal(false)}
        />

        <EditService
          show={showServiceModal}
          handleClose={() => setShowServiceModal(false)}
        />

        <Alert show={showLogoutAlert} variant="danger">
          <Alert.Heading>Apakah Anda yakin ingin keluar?</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowLogoutAlert(false)} variant="outline-secondary" className="mr-2">
              Batal
            </Button>
            <Button onClick={handleLogout} variant="danger">
              Keluar
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
}

export default AkunInf;