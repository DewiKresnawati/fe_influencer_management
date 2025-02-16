import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function EditPassword({ show, handleClose }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Password baru dan konfirmasi password tidak cocok');
      setSuccess('');
      return;
    }

    try {
      const influencerId = localStorage.getItem('influencer_id');
      const response = await axios.post('http://localhost/star-1/backend/changePassword.php', {
        influencer_id: influencerId,
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        setSuccess('Password berhasil diubah');
        setError('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(response.data.error);
        setSuccess('');
      }
    } catch (error) {
      setError('There was an error changing the password!');
      setSuccess('');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ubah Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form>
          <Form.Group controlId="formOldPassword">
            <Form.Label>Password Lama</Form.Label>
            <Form.Control
              type={showOldPassword ? 'text' : 'password'}
              placeholder="Masukkan Password Lama"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Button variant="secondary" onClick={toggleShowOldPassword}>
              {showOldPassword ? 'Sembunyikan' : 'Tampilkan'}
            </Button>
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>Password Baru</Form.Label>
            <Form.Control
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Masukkan Password Baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button variant="secondary" onClick={toggleShowNewPassword}>
              {showNewPassword ? 'Sembunyikan' : 'Tampilkan'}
            </Button>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Konfirmasi Password Baru</Form.Label>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Konfirmasi Password Baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="secondary" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? 'Sembunyikan' : 'Tampilkan'}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Tutup</Button>
        <Button variant="primary" onClick={handleChangePassword}>Simpan</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPassword;