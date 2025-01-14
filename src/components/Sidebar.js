import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter(); // Ottieni il percorso attuale
  const [isVisible, setIsVisible] = useState(true); // Stato per la visibilità
  const [lastScrollPos, setLastScrollPos] = useState(0); // Ultima posizione di scroll
  const [hoverText, setHoverText] = useState("Commissions"); // Stato per gestire il testo
  const [hoverText2, setHoverText2] = useState("Educational"); // Stato per gestire il testo
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Stato per il menu mobile


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > lastScrollPos && currentScrollPos > 50) {
        // Nascondi quando si scrolla verso il basso
        setIsVisible(false);
        setIsMobileMenuOpen(false)
      } else {
        // Mostra quando si scrolla verso l'alto
        setIsVisible(true);
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPos]);

  return (
    <aside
      style={{
        ...styles.sidebar,
        top: isVisible ? '0' : '-100px', // Nascondi mostrando fuori schermo
        transition: 'top 0.3s ease-in-out', // Animazione fluida
      }}
    >
      <ul className='headerDesktop' >
        {/* Guido Borso a sinistra */}
        <li style={styles.left}>
          <Link className='vociMenuHeader' href="/" style={router.pathname === '/' ? styles.linkHome : styles.linkHome}>
            Guido Borso
          </Link>
        </li>

        {/* Works, Commissions, Educational al centro */}
        <div style={styles.centerContainer}>
          <li>
            <Link className='vociMenuHeader'
              href="/works2"
              style={router.pathname === '/works2' ? styles.activeLink : styles.link}
            >
              Works
            </Link>
          </li>
          <li
      onMouseEnter={() => setHoverText("Coming Soon")} // Cambia il testo su hover
      onMouseLeave={() => setHoverText("Commissions")} // Ripristina il testo originale
    >
      <Link className='vociMenuHeader'
        href=""
        style={router.pathname === "/commissions" ? styles.activeLink : styles.link}
      >
        {hoverText}
      </Link>
    </li>

    <li
      onMouseEnter={() => setHoverText2("ComingSoon")} // Cambia il testo su hover
      onMouseLeave={() => setHoverText2("Educational")} // Ripristina il testo originale
    >
      <Link className='vociMenuHeader'
        href=""
        style={router.pathname === "/educational" ? styles.activeLink : styles.link}
      >
        {hoverText2}
      </Link>
    </li>
          
        </div>

        {/* About a destra */}
        <li style={styles.right}>
          <Link className='vociMenuHeader'
            href="/about"
            style={router.pathname === '/about' ? styles.activeLink : styles.linkAbout}
          >
            About
          </Link>
        </li>
      </ul>

      <div className="headerMobile">
        <Link href="/" style={styles.linkHome}>Guido Borso</Link>
        

        {/* Bottone per aprire/chiudere il menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{color:'black'}}
        >
          {isMobileMenuOpen ? '-' : '+'}
        </button>

        {/* Mostra/Nasconde il menu mobile */}
        {isMobileMenuOpen && (
          <ul className="menuOpenMobile" style={styles.mobileMenu}>
            <li >
              
              <Link  style={{color:'black'}} href="/works2">Works</Link>
            </li>
            <li>
              <Link  style={{color:'black'}} href="/" >Commissions</Link>
            </li>
           
            <li>
             
              <Link  style={{color:'black'}} href="/" >educational</Link>
            </li>
            <li>
             
             <Link  style={{color:'black'}} href="/about" >about</Link>
           </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: '45px',
    paddingRight: '45px',
    paddingTop: '20px',
    position: 'fixed',
    top: '0%', // Modificato dinamicamente
    zIndex: 10,
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  left: {
    marginRight: 'auto',
  },
  centerContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexGrow: 1,
  },
  right: {
    marginLeft: 'auto',
  },
  linkHome: {
    display: 'block',
    padding: '5px 0px',
    textDecoration: 'none',
    color: 'black',
    fontSize: '20px',
  },
  link: {
    display: 'block',
    padding: '5px 20px',
    textDecoration: 'none',
    color: 'black',
    fontSize: '20px',
  },
  linkAbout: {
    display: 'block',
    padding: '5px 0px',
    textDecoration: 'none',
    color: 'black',
    fontSize: '20px',
  },
  activeLink: {
    display: 'block',
    padding: '5px 20px',
    textDecoration: 'none',
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
    borderBottom: '1px solid',
  },

 
};

export default Sidebar;
