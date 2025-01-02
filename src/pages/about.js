import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTS } from '../lib/queries';
import Sidebar from '../components/Sidebar'; 
import NewsButt from '../components/tastoNews';


export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS, { client });

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
    <main>
      <h1>BIO</h1>
     <p style={{
      color: 'black',
      width: '30vw',
      marginTop: '20vH',
      position: 'absolute',
      right: '9vW',
     }}>Born in 1990 in Milano, where he lives and works.  After the art school diploma, he attended the Bauer photography school and the Civica Scuola del Cinema. Through photography, Guido Borso explores how humanity lives within society and adapts to it, and at the same time how it relates with the outside world, working (when possible) in the emotional sphere of the people he meets. He currently works as a freelance photographer and his shots were published on D-la Repubblica, Rivista Studio, Vision, Flash Art, Grossomondo, Vice and other underground and commercial magazines.</p>

<Sidebar />
<NewsButt />

    </main>
  );
}
