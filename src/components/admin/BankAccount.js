import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

function BankAccount() {
  const [formData, setFormData] = useState({
    id: '',
    bankType: '',
    accountNumber: '',
    accountHolder: '',
  });
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get('http://localhost/star-1/backend/bankAccount.php');
      setBankAccounts(response.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data!', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put('http://localhost/star-1/backend/bankAccount.php', formData);
        alert('Detail rekening bank berhasil diperbarui!');
      } else {
        await axios.post('http://localhost/star-1/backend/bankAccount.php', formData);
        alert('Detail rekening bank berhasil disubmit!');
      }
      setFormData({ id: '', bankType: '', accountNumber: '', accountHolder: '' });
      setIsEditing(false);
      fetchBankAccounts();
    } catch (error) {
      console.error('Terjadi kesalahan saat mengirimkan form!', error);
    }
  };

  const handleEdit = (account) => {
    setFormData(account);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost/star-1/backend/bankAccount.php?id=${id}`);
      alert('Detail rekening bank berhasil dihapus!');
      fetchBankAccounts();
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus data!', error);
    }
  };

  return (
    <Container style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      <Row>
        <Col md={12}>
          <h3>Input Detail Rekening Bank</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBankType">
              <Form.Label>Jenis Bank</Form.Label>
              <Form.Control
                as="select"
                name="bankType"
                value={formData.bankType}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih Jenis Bank</option>
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BNI">BNI</option>
                <option value="BRI">BRI</option>
                <option value="CIMB">CIMB</option>
                <option value="Danamon">Danamon</option>
                <option value="Permata">Permata</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAccountNumber" className="mt-3">
              <Form.Label>Nomor Rekening</Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAccountHolder" className="mt-3">
              <Form.Label>Nama Pemilik Rekening</Form.Label>
              <Form.Control
                type="text"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {isEditing ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={12}>
          <h3>Daftar Rekening Bank</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Jenis Bank</th>
                <th>Nomor Rekening</th>
                <th>Nama Pemilik Rekening</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bankAccounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.bank_type}</td>
                  <td>{account.account_number}</td>
                  <td>{account.account_holder}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(account)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(account.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default BankAccount;