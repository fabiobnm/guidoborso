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

  console.log('Dati ricevuti:', data.homePages[0].cover);

  return (
    <main style={{marginTop:'0px',background:''}}>
    <div className='boxImageHome' >

      {data.homePages[0].cover.map((cover) => (
         
            <img className='imageHome'
                key={cover.id}
                src={cover.url}
            />       

      
      ))}
  </div>

      <Sidebar />
    </main>
  );
}

