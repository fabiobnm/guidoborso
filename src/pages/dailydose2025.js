import { useState } from 'react';
import Modal from 'react-modal'; // Importa React Modal
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSDailyDose2025 } from '../lib/queries';
import Sidebartest from '../components/Sidebartest';

Modal.setAppElement('#__next'); // Indica il nodo principale della tua app

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSDailyDose2025, { client });

  const [selectedImage, setSelectedImage] = useState(null); // Stato per l'immagine selezionata
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per gestire la visibilità della modale

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Errore nella query:', error.message);
    return <p>Error: {error.message}</p>;
  }
  console.log(data.dailyDose2025S[0].post);
  
  if (!data || !data.dailyDose2025S[0].post) {
    return <p>Nessun progetto trovato</p>;
  }

  const progetti = Array.isArray(data.dailyDose2025S[0].post) ? data.dailyDose2025S[0].post : [data.dailyDose2025S[0].post];

  // Funzioni per aprire e chiudere la modale
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <main style={{ marginTop: '10px' }}>
      <img className='dailyLogo' src='/dailyd.jpeg' alt="Daily Dose Logo" />
      <div style={{ display: 'block' }}>
        <h1 className='titoloDaily'>GUIDO BORSO DAILY DOSE 2025</h1>
        <h2 className='sottoTitoloDaily'>One year of everyday life pictures</h2>
      </div>
      {progetti.map((progetto) => (
        <div className='dailyPost' key={progetto.id}>
          <h1 style={{ color: 'black', fontSize: '28px' }}>{progetto.testo}</h1>
          <div style={{ display: 'flex', overflowX: 'scroll' }}>
            {progetto.gallery.map((gigio, index) => (
              <img
                key={index}
                src={gigio.url}
                alt={`${progetto.nome} galleria ${index}`}
                style={{ height: '60vH', marginRight: '20px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => openModal(gigio.url)} // Apertura della modale al clic
              />
            ))}
          </div>
        </div>
      ))}

      {/* Modale per l'immagine */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(237, 237, 237, 0.8)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
          },
        }}
      >
        <img
          src={selectedImage}
          alt="Immagine ingrandita"
          style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
        />
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Close
        </button>
      </Modal>
    </main>
  );
}
