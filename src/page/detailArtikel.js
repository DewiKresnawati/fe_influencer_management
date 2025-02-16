import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import axios from 'axios';

function DetailArtikel() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost/star-1/backend/artikel.php?id=${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("There was an error fetching the article!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div>
        <NavigationBar />
        <div style={{ padding: '50px', textAlign: 'center', backgroundColor: 'white', color: '#001D3D', minHeight: '100vh' }}>
          <h2>Loading...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div>
        <NavigationBar />
        <div style={{ padding: '50px', textAlign: 'center', backgroundColor: 'white', color: '#001D3D', minHeight: '100vh' }}>
          <h2>Article not found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <div style={{ padding: '50px', backgroundColor: 'white', color: '#001D3D', minHeight: '100vh' }}>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        {article.image && <img src={`http://localhost/star-1/starweb/${article.image}`} alt={article.title} style={{ width: '100%' }} />}
      </div>
      <Footer />
    </div>
  );
}

export default DetailArtikel;