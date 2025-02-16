import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

function AkunBrand() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    email: '',
    password: '',
    brand_name: '',
    pic_name: '',
    pic_phone: '',
    province: '',
    city: '',
    referral_code: '',
    name: '',
    phone: '',
    address: '',
    image: null,
  });

  const brandId = localStorage.getItem('brand_id');

  useEffect(() => {
    if (brandId) {
      // Fetch profile data from API
      axios.get(`http://localhost/star-1/backend/brand/brand.php?brand_id=${brandId}`)
        .then(response => {
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the profile data!', error);
        });
    }
  }, [brandId]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    axios.put('http://localhost/star-1/backend/brand/brand.php', { ...profileData, brand_id: brandId })
      .then(response => {
        setShowEditSuccess(true);
        setShowProfileModal(false);
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('brand_id');
    setShowLogoutAlert(false);
    window.location.href = '/';
  };

  const containerStyle = {
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
    marginLeft: '15px', // Adjusted margin to move content to the left
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
          <Button style={buttonStyle} onClick={() => setShowLogoutAlert(true)}>Logout</Button>
        </div>

        {/* Profile Modal */}
        <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProfileEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={profileData.email} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfileBrandName">
                <Form.Label>Nama Brand</Form.Label>
                <Form.Control type="text" name="brand_name" value={profileData.brand_name} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfilePicName">
                <Form.Label>Nama PIC</Form.Label>
                <Form.Control type="text" name="pic_name" value={profileData.pic_name} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfilePicPhone">
                <Form.Label>Telepon PIC</Form.Label>
                <Form.Control type="text" name="pic_phone" value={profileData.pic_phone} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfileProvince">
                <Form.Label>Provinsi</Form.Label>
                <Form.Control type="text" name="province" value={profileData.province} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfileCity">
                <Form.Label>Kota</Form.Label>
                <Form.Control type="text" name="city" value={profileData.city} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfileReferralCode">
                <Form.Label>Kode Referral</Form.Label>
                <Form.Control type="text" name="referral_code" value={profileData.referral_code} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfileName">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="name" value={profileData.name} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfilePhone">
                <Form.Label>Telepon</Form.Label>
                <Form.Control type="text" name="phone" value={profileData.phone} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfileAddress">
                <Form.Label>Alamat</Form.Label>
                <Form.Control type="text" name="address" value={profileData.address} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group controlId="formProfileImage">
                <Form.Label>Gambar</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
                {profileData.image && <img src={profileData.image} alt="Profile" style={{ width: '100px', marginTop: '10px' }} />}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProfileModal(false)}>Tutup</Button>
            <Button variant="primary" onClick={handleSaveProfile}>Simpan</Button>
          </Modal.Footer>
        </Modal>

        {/* Password Modal */}
        <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ubah Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formOldPassword">
                <Form.Label>Password Lama</Form.Label>
                <Form.Control type="password" placeholder="Masukkan Password Lama" />
              </Form.Group>
              <Form.Group controlId="formNewPassword">
                <Form.Label>Password Baru</Form.Label>
                <Form.Control type="password" placeholder="Masukkan Password Baru" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Tutup</Button>
            <Button variant="primary" onClick={() => setShowPasswordModal(false)}>Simpan</Button>
          </Modal.Footer>
        </Modal>

        {/* Logout Alert */}
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

        {/* Edit Success Modal */}
        <Modal show={showEditSuccess} onHide={() => setShowEditSuccess(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Berhasil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Profile berhasil diedit.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowEditSuccess(false)}>Tutup</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AkunBrand;