import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import axios from 'axios';

const initialFormState = { id: null, title: '', excerpt: '', content: '', image: '' };

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://mesindigital.xyz/influence-be/artikel.php');
      let data = response.data;

      // Check if response.data is not an array
      if (!Array.isArray(data)) {
        // Try to parse as JSON if it's a string
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) {
            console.error('Error parsing JSON:', e);
            data = [];
          }
        } else {
          // If it's an object, wrap it in an array
          data = [data];
        }
      }

      // Filter out unexpected messages and take only valid articles
      const validArticles = data.filter(item => typeof item === 'object' && item.id);
      setArticles(validArticles);
    } catch (error) {
      console.error('There was an error fetching the articles!', error);
      setArticles([]);
    }
  };

  const handleCreate = () => {
    setForm(initialFormState);
    setIsEditing(true);
  };

  const handleEdit = (article) => {
    setForm(article);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://mesindigital.xyz/influence-be/artikel.php`, { data: { id } });
    fetchArticles();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('excerpt', form.excerpt);
    formData.append('content', form.content);
    formData.append('image', form.image);

    if (form.id) {
      formData.append('id', form.id);
      await axios.put('https://mesindigital.xyz/influence-be/artikel.php', formData);
    } else {
      await axios.post('https://mesindigital.xyz/influence-be/artikel.php', formData);
    }
    setIsEditing(false);
    fetchArticles();
  };

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      {isEditing ? (
        <Row className="mt-4">
          <Col>
            <h2>{form.id ? 'Edit Artikel' : 'Buat Artikel Baru'}</h2>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul artikel"
                />
              </Form.Group>
              <Form.Group controlId="formExcerpt" className="mt-3">
                <Form.Label>Ringkasan</Form.Label>
                <Form.Control
                  type="text"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="Masukkan ringkasan artikel"
                />
              </Form.Group>
              <Form.Group controlId="formContent" className="mt-3">
                <Form.Label>Konten</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Masukkan konten artikel"
                />
              </Form.Group>
              <Form.Group controlId="formImage" className="mt-3">
                <Form.Label>Gambar</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={handleSave}>Simpan</Button>{' '}
              <Button variant="secondary" className="mt-3" onClick={() => setIsEditing(false)}>Batal</Button>
            </Form>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="mt-4">
            <Col>
              <Button variant="primary" onClick={handleCreate}>Buat Artikel Baru</Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3>Daftar Artikel</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Ringkasan</th>
                    <th>Konten</th>
                    <th>Gambar</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td>{article.title}</td>
                      <td>{article.excerpt}</td>
                      <td>{article.content}</td>
                      <td><img src={`https://mesindigital.xyz/influence-be/${article.image}`} alt={article.title} style={{ width: '100px' }} /></td>
                      <td>
                        <Button variant="warning" onClick={() => handleEdit(article)}>Edit</Button>{' '}
                        <Button variant="danger" onClick={() => handleDelete(article.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Articles;