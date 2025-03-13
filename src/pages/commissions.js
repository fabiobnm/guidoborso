import { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTS, GET_POSTSCommissions } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import { useSpring, animated } from '@react-spring/web';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSCommissions, { client });

  // Stato per il Modal e il carosello
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState([]);

  // Animazione per il modal
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 300, friction: 25 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Errore nella query:', error.message);
    return <p>Error: {error.message}</p>;
  }

  const openModal = (gallery, index) => {
    setCurrentGallery(gallery);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigateCarousel = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return currentGallery.length - 1;
      if (newIndex >= currentGallery.length) return 0;
      return newIndex;
    });
  };

  return (
    <main style={{ marginTop: '75px' }}>
      {data.commissions.map((commissions) => (
        <div className="projectDivWork" key={commissions.id}>
          <h1 style={{ color: 'black', fontSize: '20px', padding: '50px', paddingLeft: '0' }}>
            {commissions.info}
          </h1>

          <div className="caros">
            <div
              className="gallery-image-container"
              style={{
                width: '100%',
                height: 'auto',
                overflow: 'hidden',
                margin: 'auto',
                marginRight: '0px',
                cursor: 'pointer',
              }}
              onClick={() => openModal([commissions.immagine.url], 0)} // Passa la galleria e l'indice corrente
            >
              <img
                src={commissions.immagine.url}
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <animated.div
            style={{
              ...modalAnimation,
              position: 'relative',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              overflow: 'hidden',
              maxWidth: '80%',
              maxHeight: '80%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#000',
              }}
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={currentGallery[currentImageIndex]}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
              }}
            >
              <button
                onClick={() => navigateCarousel(-1)}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                Prev
              </button>
              <button
                onClick={() => navigateCarousel(1)}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            </div>
          </animated.div>
        </div>
      )}

      <Sidebar />
    </main>
  );
}
