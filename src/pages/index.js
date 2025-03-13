import { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSHome } from '../lib/queries';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSHome, { client });

  // Stato per memorizzare lo zIndex di ogni immagine
  const [zIndexes, setZIndexes] = useState({}); 
  const [highestZIndex, setHighestZIndex] = useState(1); // Tiene traccia del valore massimo

  const handleImageClick = (id) => {
    setZIndexes((prevZIndexes) => ({
      ...prevZIndexes,
      [id]: highestZIndex + 1, // Imposta il nuovo zIndex solo per l'immagine cliccata
    }));
    setHighestZIndex(highestZIndex + 1); // Aggiorna il massimo valore di zIndex
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Errore nella query:', error.message);
    return <p>Error: {error.message}</p>;
  }

  console.log('Dati ricevuti:', data.homePages[0].cover);

  return (
    <main style={{ marginTop: '0px' }}>
      <div className="boxImageHome">
        {data.homePages[0].cover.map((cover, index) => (
          <img
            className="imageHome"
            onClick={() => handleImageClick(cover.id)}
            key={cover.id}
            src={cover.url}
            style={{
              position: 'fixed',
              marginTop: `${index * 40}px`,
              marginLeft: `${(index + 1) * 40}px`,
              zIndex: zIndexes[cover.id] || index, // Se non è stato cliccato, mantiene l'ordine originale
              transition: 'z-index 0.2s ease-in-out',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <Sidebar />
    </main>
  );
}
