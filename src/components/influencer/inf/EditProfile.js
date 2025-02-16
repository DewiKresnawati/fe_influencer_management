import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './EditProfile.css'; // Import file CSS khusus

function EditProfile({ show, handleClose, influencerId }) {
  const [profileData, setProfileData] = useState({
    email: '',
    full_name: '',
    birth_date: '',
    gender: '',
    influencer_category: '',
    phone_number: '',
    referral_code: '',
    ktp_number: '',
    npwp_number: '',
    instagram_link: '',
    followers_count: '',
    profile_picture: '',
    bank_account: '',
    account_number: '',
    province: '',
    city: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const storedInfluencerId = influencerId || localStorage.getItem('influencer_id');
    console.log('Component mounted or influencerId changed:', storedInfluencerId);

    const fetchProfileData = async () => {
      console.log('Fetching profile data for influencerId:', storedInfluencerId);
      try {
        const response = await axios.get(`http://localhost/star-1/backend/influencerProfile.php?id=${storedInfluencerId}`);
        console.log('Fetched profile data:', response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Terjadi kesalahan saat mengambil data profil!');
      }
    };

    if (storedInfluencerId) {
      fetchProfileData();
    }
  }, [influencerId]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profile_picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    const storedInfluencerId = influencerId || localStorage.getItem('influencer_id');
    console.log('Saving profile data for influencerId:', storedInfluencerId);
    const formData = new FormData();
    formData.append('id', storedInfluencerId);
    formData.append('email', profileData.email);
    formData.append('full_name', profileData.full_name);
    formData.append('birth_date', profileData.birth_date);
    formData.append('gender', profileData.gender);
    formData.append('influencer_category', profileData.influencer_category);
    formData.append('phone_number', profileData.phone_number);
    formData.append('referral_code', profileData.referral_code);
    formData.append('ktp_number', profileData.ktp_number);
    formData.append('npwp_number', profileData.npwp_number);
    formData.append('instagram_link', profileData.instagram_link);
    formData.append('followers_count', profileData.followers_count);
    formData.append('bank_account', profileData.bank_account);
    formData.append('account_number', profileData.account_number);
    formData.append('province', profileData.province);
    formData.append('city', profileData.city);
    if (selectedFile) {
      formData.append('profile_picture', selectedFile);
    } else {
      formData.append('profile_picture', profileData.profile_picture);
    }

    try {
      const response = await axios.put('http://localhost/star-1/backend/influencerProfile.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSuccess('Profil berhasil diubah');
        setError('');
      } else {
        setError(response.data.error);
        setSuccess('');
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
      setError('Terjadi kesalahan saat memperbarui profil!');
      setSuccess('');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        {profileData.profile_picture && (
          <div className="text-center mb-3">
            <img src={`http://localhost/star-1/backend/${profileData.profile_picture}`} alt="Profile" style={{ width: '150px', borderRadius: '50%' }} />
          </div>
        )}
        <Form>
          <Form.Group controlId="formProfileEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={profileData.email} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileName">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" name="full_name" value={profileData.full_name} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileBirthDate">
            <Form.Label>Tanggal Lahir</Form.Label>
            <Form.Control type="date" name="birth_date" value={profileData.birth_date} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileGender">
            <Form.Label>Jenis Kelamin</Form.Label>
            <Form.Control type="text" name="gender" value={profileData.gender} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileCategory">
            <Form.Label>Kategori Influencer</Form.Label>
            <Form.Control type="text" name="influencer_category" value={profileData.influencer_category} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfilePhoneNumber">
            <Form.Label>Nomor Telepon</Form.Label>
            <Form.Control type="text" name="phone_number" value={profileData.phone_number} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileReferralCode">
            <Form.Label>Kode Referral</Form.Label>
            <Form.Control type="text" name="referral_code" value={profileData.referral_code} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileKTPNumber">
            <Form.Label>Nomor KTP</Form.Label>
            <Form.Control type="text" name="ktp_number" value={profileData.ktp_number} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileNPWPNumber">
            <Form.Label>Nomor NPWP</Form.Label>
            <Form.Control type="text" name="npwp_number" value={profileData.npwp_number} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileInstagramLink">
            <Form.Label>Link Instagram</Form.Label>
            <Form.Control type="text" name="instagram_link" value={profileData.instagram_link} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileFollowers">
            <Form.Label>Jumlah Followers</Form.Label>
            <Form.Control type="text" name="followers_count" value={profileData.followers_count} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileBankAccount">
            <Form.Label>Nama Bank</Form.Label>
            <Form.Control type="text" name="bank_account" value={profileData.bank_account} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileAccountNumber">
            <Form.Label>Nomor Rekening</Form.Label>
            <Form.Control type="text" name="account_number" value={profileData.account_number} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileProvince">
            <Form.Label>Provinsi</Form.Label>
            <Form.Control type="text" name="province" value={profileData.province} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileCity">
            <Form.Label>Kota</Form.Label>
            <Form.Control type="text" name="city" value={profileData.city} onChange={handleProfileChange} />
          </Form.Group>
          <Form.Group controlId="formProfileImage">
            <Form.Label>Gambar</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Tutup</Button>
        <Button variant="primary" onClick={handleSaveProfile}>Simpan</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProfile;