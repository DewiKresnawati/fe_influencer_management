import React, { useState, useEffect } from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';

function Notifikasi() {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // Ambil brand_id dari localStorage
    const brandId = localStorage.getItem("brand_id");

    if (!brandId) {
      console.error("Brand ID tidak ditemukan di localStorage");
      return;
    }

    // Fetch notifications berdasarkan brand_id
    axios
      .get(`http://localhost/star-1/backend/brand/notifications.php?brand_id=${brandId}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the notifications!", error);
      });
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return { color: 'green' };
      case 'rejected':
        return { color: 'red' };
      case 'pending':
        return { color: 'orange' }; 
      case 'Completed':
        return { color: 'black' };
      default:
        return {};
    }
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

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2 className="text-center mb-4" style={{ color: '#001D3D' }}>Notifikasi</h2>
        <ListGroup>
          {Array.isArray(notifications) && notifications.map((notification) => (
            <ListGroup.Item key={notification.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{notification.influencer_name}</span>
                <span style={getStatusStyle(notification.status)}>
                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                </span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Notifikasi;