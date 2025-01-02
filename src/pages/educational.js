import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSEduc } from '../lib/queries';
import Sidebar from '../components/Sidebar'; 
import NewsButt from '../components/tastoNews';


export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSEduc, { client });

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err');
    console.error('Errore nella query:', error.message);
    console.error('Dettagli dell\'errore:', error.graphQLErrors);
    console.error('Dettagli della risposta:', error.networkError);
    return <p>Error: {error.message}</p>;
  }

  console.log('Dati ricevuti:', data);

  return (
    <main>
      <div className="educational" style={{ display: 'flex', marginTop: '300px' }}>
        {data.educationals.map((progetto) => (
           <div>
            <h1 style={{color:'black'}}>{progetto.titolo}</h1>
            <h3 style={{color:'black'}}>{progetto.info}</h3>
          <div className="card" key={progetto.id}>
            <div className="card-inner">
              {/* Lato frontale */}
              <div className="card-front">
                <img 
                  style={{ height: '500px' }} 
                  src={progetto.retro.url} 
                  alt={progetto.nome} 
                />
              </div>
              {/* Lato retro */}
              <div className="card-back">
                <img 
                  style={{ height: '500px' }} 
                  src={progetto.copertina.url} 
                  alt={`Retro di ${progetto.nome}`} 
                />
              </div>
            </div>
            <h2>{progetto.nome}</h2>
            <p>{progetto.info}</p>
          </div>
          </div>
        ))}

      </div>
      
      <Sidebar />
      <NewsButt />
    </main>
  );
}
