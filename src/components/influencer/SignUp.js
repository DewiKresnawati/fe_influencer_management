import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    birthDate: '',
    gender: '',
    influencerCategory: '',
    phoneNumber: '',
    referralCode: '',
    ktpNumber: '',
    npwpNumber: '',
    instagramLink: '',
    followersCount: '',
    profilePicture: null,
    bankAccount: '',
    accountNumber: '',
    province: '',
    city: '',
  });
  const [isValidated, setIsValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [manualInput, setManualInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch provinces from API
    axios.get('https://alamat.thecloudalert.com/api/provinsi/get/')
      .then(response => {
        setProvinces(response.data.result);
      })
      .catch(error => {
        console.error('There was an error fetching the provinces!', error);
        setManualInput(true);
      });
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setFormData({ ...formData, province: provinceId, city: '' });

    // Fetch cities based on selected province
    axios.get(`https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`)
      .then(response => {
        setCities(response.data.result);
      })
      .catch(error => {
        console.error('There was an error fetching the cities!', error);
        setManualInput(true);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleValidationChange = (e) => {
    setIsValidated(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Handle final form submission
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        const response = await axios.post('http://localhost/star-1/backend/signinfluencer.php', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Form submitted:', response.data);
        if (response.data.success) {
          localStorage.setItem('influencer_id', response.data.influencer_id);
          setShowModal(true);
        } else {
          console.error('There was an error submitting the form!', response.data.error);
        }
      } catch (error) {
        console.error('There was an error submitting the form!', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/influencer/login');
  };

  return (
    <>
      <div style={{ padding: '50px 0', backgroundColor: '#001D3D', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '500px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '100px', backgroundColor: '#FFC300', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img src="/landing/navbar/logo.png" alt="Logo" style={{ width: '80px', height: '40px' }} />
          </div>
          <h2 className="text-center mb-4" style={{ marginTop: '60px' }}>Daftar</h2>
          <Form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Kata Sandi</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="input-group-append">
                      <Button variant="outline-secondary" onClick={handleTogglePassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formValidation">
                  <Form.Check
                    type="checkbox"
                    label="Saya mengonfirmasi bahwa data yang dimasukkan sudah benar"
                    checked={isValidated}
                    onChange={handleValidationChange}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isValidated}
                  style={{ backgroundColor: '#FFC300', color: 'blue' }}
                >
                  Daftar
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <Form.Group controlId="formFullName">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBirthDate">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formGender">
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                    <option value="other">Lainnya</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formInfluencerCategory">
                  <Form.Label>Kategori Influencer</Form.Label>
                  <Form.Control
                    as="select"
                    name="influencerCategory"
                    value={formData.influencerCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih Kategori Influencer</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Lifestyle and Travel">Lifestyle and Travel</option>
                    <option value="Family and Parenting">Family and Parenting</option>
                    <option value="Beauty and Fashion">Beauty and Fashion</option>
                    <option value="Health and Support">Health and Support</option>
                    <option value="Technology">Technology</option>
                    <option value="Food and Beverages">Food and Beverages</option>
                    <option value="Gaming">Gaming</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Nomor Telepon</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formReferralCode">
                  <Form.Label>Kode Referal (Opsional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formKtpNumber">
                  <Form.Label>Nomor KTP</Form.Label>
                  <Form.Control
                    type="text"
                    name="ktpNumber"
                    value={formData.ktpNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formNpwpNumber">
                  <Form.Label>Nomor NPWP</Form.Label>
                  <Form.Control
                    type="text"
                    name="npwpNumber"
                    value={formData.npwpNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formInstagramLink">
                  <Form.Label>Link Instagram</Form.Label>
                  <Form.Control
                    type="text"
                    name="instagramLink"
                    value={formData.instagramLink}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formFollowersCount">
                  <Form.Label>Jumlah Followers</Form.Label>
                  <Form.Control
                    type="number"
                    name="followersCount"
                    value={formData.followersCount}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formProfilePicture">
                  <Form.Label>Foto Profil</Form.Label>
                  <Form.Control
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBankAccount">
                  <Form.Label>Nama Bank</Form.Label>
                  <Form.Control
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formAccountNumber">
                  <Form.Label>Nomor Rekening</Form.Label>
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formProvince">
                  <Form.Label>Pilih Provinsi</Form.Label>
                  {manualInput ? (
                    <Form.Control
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <Form.Control
                      as="select"
                      name="province"
                      value={formData.province}
                      onChange={handleProvinceChange}
                      required
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>{province.text}</option>
                      ))}
                    </Form.Control>
                  )}
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>Pilih Kota</Form.Label>
                  {manualInput ? (
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  ) : (
                    <Form.Control
                      as="select"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.province}
                    >
                      <option value="">Pilih Kota</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>{city.text}</option>
                      ))}
                    </Form.Control>
                  )}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: '#FFC300', color: 'blue' }}
                >
                  Daftar
                </Button>
              </>
            )}
          </Form>
          <Link to="/influencer/login" className="btn btn-link mt-3">
            <FaArrowLeft /> Kembali
          </Link>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrasi Berhasil</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaCheckCircle size={50} color="green" />
          <p className="mt-3">Anda telah berhasil mendaftar sebagai influencer!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignUp;