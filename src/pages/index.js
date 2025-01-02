import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSHome } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import NewsButt from '../components/tastoNews';



export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSHome, { client });

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err')
    console.log('ciaoooo')
    console.log(data)
    
    console.error('Errore nella query:', error.message);
    console.error('Dettagli dell\'errore:', error.graphQLErrors);
    console.error('Dettagli della risposta:', error.networkError);
    return <p>Error: {error.message}</p>;
  }

  console.log('Dati ricevuti:', data);

  return (
    <main style={{marginTop:'125px',background:''}}>
      <h1>dghkj</h1>
      {data.homePages.map((cover) => (
        <div style={{height:'auto', margin:'0px'}} key={cover.id}>
          <h1>dfgkjdh</h1>
            <img
                src={cover.url}
                style={{  width: '150px',height:'fit-content', margin:'auto',marginRight : '15px' }} // Stile per le immagini della galleria
            />       

        </div>
      ))}


      <Sidebar />
      <NewsButt />
    </main>
  );
}

