import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NewsButt = () => {
  const router = useRouter(); // Ottieni il percorso attuale

  return (
    <div style={styles.gigio}>
       <Link 
              href="/dailydose2025"
              style={styles.news}
            >
              daily dose 2025
            </Link>
    
    </div>
  );
};

const styles = {
  gigio: {
    width: 'auto',
    backgroundColor: 'none',
    paddingLeft: '45px',
    paddingRight: '45px',
    paddingTop: '20px',
    position: 'fixed',
    bottom: '0%',
    right:'0px'
  },
  news:{
backgroundColor:'#002fa7',
padding:'25px',
fontSize:'30px',
  },
  
};

export default NewsButt;
