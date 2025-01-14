import { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTS } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import NewsButt from '../components/tastoNews';

import Modal from 'react-modal';


// Configura React Modal per accessibilità
Modal.setAppElement('#__next');

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS, { client });

  // Stato per il Modal e il carosello
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState([]);

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
      {data.progettis.map((progetto) => (
        <div className='projectDivWork'
          key={progetto.id}
        >
          <h1 style={{ color: 'black', fontSize: '20px', textAlign: 'center', padding: '50px' }}>
            {progetto.nome}
          </h1>

          <div className="caros">
            {progetto.galleria.map((image, index) => (
              <div
                key={index}
                className="gallery-image-container"
                style={{
                  width: '100%',
                  height: 'auto',
                  overflow: 'hidden',
                  margin: 'auto',
                  marginRight: '0px',
                  cursor: 'pointer',
                }}
                onClick={() => openModal(progetto.galleria, index)}
              >
                <img
                  src={image.url}
                  alt={`${progetto.nome} galleria ${index}`}
                  style={{ width: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <Sidebar />

      <NewsButt />

      {/* Modal per il carosello */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Carousel"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button className="close-btn" onClick={closeModal}>
          ✖
        </button>
        <button className="nav-btn prev-btn" onClick={() => navigateCarousel(-1)}>
          
        </button>
        <img
          src={currentGallery[currentImageIndex]?.url}
          alt={`Carousel Image ${currentImageIndex}`}
          className="carousel-image"
        />
        <button className="nav-btn next-btn" onClick={() => navigateCarousel(1)}>
          
        </button>
      </Modal>
    </main>
  );
}
